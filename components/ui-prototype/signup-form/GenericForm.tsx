/**
 * Interview question:
 * Design a reusable form system that can power many forms without duplicating
 * state management, validation, submit handling, and field rendering logic.
 *
 * What this example demonstrates:
 * - UserForm owns the business rules for this specific form.
 * - GenericForm owns reusable mechanics: values, errors, touched state,
 *   submit lifecycle, reset behavior, and calling validate/onSubmit.
 * - FormField adapts common field types through props instead of making
 *   every form re-implement input, select, checkbox, radio, and file handling.
 *
 * Interview answer:
 * Split the problem into a generic form container and small field components.
 * The container controls data flow; the fields only describe how each value is
 * edited. This keeps new forms declarative and makes validation/submission
 * consistent across the product.
 */
"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

// ─── Shared Types ────────────────────────────────────────────────────────────

type FieldOption = {
  label: string;
  value: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFormValues = Record<string, any>;

// Errors are keyed by field name; "submit" is reserved for top-level failures.
type FormErrors = Partial<Record<string, string>>;

type FormHelpers = {
  resetForm: () => void;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  setFieldValue: (name: string, value: unknown) => void;
};

// ─── Form Context ─────────────────────────────────────────────────────────────

type FormContextValue = {
  values: AnyFormValues;
  errors: FormErrors;
  isSubmitting: boolean;
  setFieldValue: (name: string, value: unknown) => void;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  resetForm: () => void;
};

// null sentinel lets useFormContext detect when it is used outside the provider.
const FormContext = createContext<FormContextValue | null>(null);

function useFormContext(): FormContextValue {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Form components must be used inside <GenericForm>");
  }

  return context;
}

// ─── FormField ────────────────────────────────────────────────────────────────
//
// Supports: native input · textarea · select · checkbox · radio · file · custom component

type FormFieldProps = {
  name: string;
  label?: string;
  // `as` accepts a native tag string or any custom React component.
  as?: "input" | "select" | "textarea" | React.ComponentType<AnyFormValues>;
  type?: React.HTMLInputTypeAttribute;
  options?: FieldOption[];
  // Transforms the stored value before writing it back to form state.
  parseValue?: (value: unknown) => unknown;
  // Transforms the stored value into a display string for the input.
  formatValue?: (value: unknown) => string;
  // Overrides the default event-to-value extraction for custom components.
  getValueFromEvent?: (eventOrValue: unknown) => unknown;
} & Record<string, unknown>; // allow native HTML props to pass through

export function FormField({
  name,
  label,
  as: Component = "input",
  type = "text",
  options = [],
  parseValue,
  formatValue,
  getValueFromEvent,
  ...props
}: FormFieldProps) {
  const {
    values,
    errors,
    isSubmitting,
    setFieldValue,
  } = useFormContext();

  const rawValue = values[name];

  // formatValue lets callers render dates, currency, etc. in a display format
  // while keeping the stored value in a machine-friendly shape.
  const displayValue = formatValue
    ? formatValue(rawValue)
    : (rawValue ?? "") as string;

  function normalizeValue(eventOrValue: unknown): unknown {
    if (getValueFromEvent) {
      return getValueFromEvent(eventOrValue);
    }

    // React synthetic events have a `.target` — extract the real value.
    if (eventOrValue && typeof eventOrValue === "object" && "target" in eventOrValue) {
      const target = eventOrValue.target as HTMLInputElement;

      if (target.type === "checkbox") return target.checked;
      if (target.type === "file") return target.files;
      return target.value;
    }

    // Custom components may call onChange with a plain value instead of an event.
    return eventOrValue;
  }

  function handleChange(eventOrValue: unknown): void {
    const nextValue = normalizeValue(eventOrValue);

    // parseValue coerces raw DOM strings (e.g. "42") into the right JS type.
    const parsedValue = parseValue ? parseValue(nextValue) : nextValue;

    setFieldValue(name, parsedValue);
  }

  function renderSelect() {
    return (
      <select
        id={name}
        name={name}
        value={displayValue}
        disabled={isSubmitting}
        onChange={handleChange}
        {...props}
      >
        {props.placeholder != null && (
          <option value="">{String(props.placeholder)}</option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  function renderTextarea() {
    return (
      <textarea
        id={name}
        name={name}
        value={displayValue}
        disabled={isSubmitting}
        onChange={handleChange}
        {...props}
      />
    );
  }

  function renderCheckbox() {
    return (
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={Boolean(rawValue)}
        disabled={isSubmitting}
        onChange={handleChange}
        {...props}
      />
    );
  }

  function renderRadioGroup() {
    return (
      <div>
        {options.map((option) => (
          <label key={option.value} style={{ display: "block" }}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={rawValue === option.value}
              disabled={isSubmitting}
              // Radio fires with the option value, not a DOM event.
              onChange={() => handleChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    );
  }

  function renderNativeInput() {
    return (
      <input
        id={name}
        name={name}
        type={type}
        // file inputs are uncontrolled — setting value would throw a React warning.
        value={type === "file" ? undefined : displayValue}
        disabled={isSubmitting}
        onChange={handleChange}
        {...props}
      />
    );
  }

  function renderCustomComponent() {
    return (
      <Component
        id={name}
        name={name}
        value={rawValue}
        disabled={isSubmitting}
        onChange={handleChange}
        // Pass the error directly so the custom component can style itself.
        error={errors[name]}
        {...props}
      />
    );
  }

  // Dispatch order matters: more specific variants (checkbox, radio) must be
  // checked before the generic "input" branch.
  function renderField() {
    if (Component === "select")   return renderSelect();
    if (Component === "textarea") return renderTextarea();
    if (type === "checkbox")      return renderCheckbox();
    if (type === "radio")         return renderRadioGroup();
    if (Component === "input")    return renderNativeInput();
    return renderCustomComponent();
  }

  const fieldError = errors[name];

  return (
    <div style={{ marginBottom: 16 }}>
      {type === "checkbox" ? (
        // Checkbox label wraps the input so clicking the text toggles the box.
        <label>
          {renderField()} {label}
        </label>
      ) : (
        <>
          {label && (
            <label htmlFor={name} style={{ display: "block", marginBottom: 4 }}>
              {label}
            </label>
          )}
          {renderField()}
        </>
      )}

      {fieldError && (
        <p style={{ color: "red", marginTop: 4 }}>{fieldError}</p>
      )}
    </div>
  );
}

// ─── GenericForm ──────────────────────────────────────────────────────────────
//
// Responsibilities:
//   • own form values       • run validate before submit
//   • own errors            • call onSubmit after validation passes
//   • own submit lifecycle  • expose helpers (reset, setErrors, setFieldValue)

type GenericFormProps<T extends AnyFormValues = AnyFormValues> = {
  initialValues?: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T, helpers: FormHelpers) => Promise<void>;
  children: React.ReactNode;
};

export function GenericForm<T extends AnyFormValues>({
  initialValues = {} as T,
  validate,
  onSubmit,
  children,
}: GenericFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setFieldValue(name: string, value: unknown): void {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the per-field error on change so stale messages disappear immediately.
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function resetForm(): void {
    setValues(initialValues);
    setErrors({});
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    // Stop early so the user can fix errors before the network request fires.
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      await onSubmit(values, { resetForm, setErrors, setFieldValue });
    } catch (error) {
      // Surface unexpected errors under the "submit" key so GenericForm can
      // render them without coupling to any specific field.
      setErrors((prev) => ({
        ...prev,
        submit: (error as Error).message || "Something went wrong",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  // useMemo prevents every context consumer from re-rendering when unrelated
  // state in the parent tree changes.
  const contextValue = useMemo<FormContextValue>(
    () => ({ values, errors, isSubmitting, setFieldValue, setErrors, resetForm }),
    [values, errors, isSubmitting]
  );

  return (
    <FormContext.Provider value={contextValue}>
      {/* noValidate delegates all validation to our validate function. */}
      <form onSubmit={handleSubmit} noValidate>
        {children}

        {errors.submit && (
          <p style={{ color: "red" }}>{errors.submit}</p>
        )}
      </form>
    </FormContext.Provider>
  );
}

// ─── Helper Components & Utilities ───────────────────────────────────────────

// DatePicker — thin wrapper so the form system can treat a date input like any
// other custom component (receives value/onChange from FormField).
type DatePickerProps = {
  id?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

function DatePicker({ id, name, value = "", disabled, onChange }: DatePickerProps) {
  return (
    <input
      id={id}
      name={name}
      type="date"
      value={value}
      disabled={disabled}
      // DatePicker calls onChange with the string value, not a DOM event.
      // FormField's getValueFromEvent override is not needed here — we call
      // onChange directly with the value.
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

// SubmitButton — reads isSubmitting from context to disable itself mid-flight.
// Keeps button logic co-located with form state instead of requiring the caller
// to thread isSubmitting down as a prop.
type SubmitButtonProps = {
  children: React.ReactNode;
};

function SubmitButton({ children }: SubmitButtonProps) {
  const { isSubmitting } = useFormContext();

  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting…" : children}
    </button>
  );
}

// fakeApiSubmit — simulates a network round-trip for demo purposes.
async function fakeApiSubmit(values: AnyFormValues): Promise<{ ok: boolean }> {
  void values; // stub — a real implementation would POST this to an API endpoint
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ok: true };
}

// ─── UserForm ─────────────────────────────────────────────────────────────────

type UserFormValues = {
  name: string;
  email: string;
  age: string | number;
  bio: string;
  role: string;
  startDate: string;
  contactMethod: string;
  agree: boolean;
  resume: File | null;
};

export function UserForm() {
  // Initial values define the full shape of the form state. This prevents
  // uncontrolled inputs and makes reset behavior straightforward.
  const initialValues: UserFormValues = {
    name: "",
    email: "",
    age: "",
    bio: "",
    role: "",
    startDate: "",
    contactMethod: "email",
    agree: false,
    resume: null,
  };

  // Validation is kept outside GenericForm so the reusable form system is not
  // coupled to one product's business rules. Return an object where each key
  // matches a field name.
  function validate(values: UserFormValues): FormErrors {
    const errors: FormErrors = {};

    if (!values.name.trim())            errors.name = "Name is required";
    if (!values.email.trim())           errors.email = "Email is required";
    else if (!values.email.includes("@")) errors.email = "Email is invalid";
    if (!values.age)                    errors.age = "Age is required";
    else if (Number(values.age) < 18)   errors.age = "Age must be at least 18";
    if (!values.role)                   errors.role = "Role is required";
    if (!values.startDate)              errors.startDate = "Start date is required";
    if (!values.agree)                  errors.agree = "You must agree to continue";

    return errors;
  }

  // GenericForm calls this only after validate returns no errors. `helpers`
  // exposes form actions without leaking internal state implementation details.
  async function handleSubmit(
    values: UserFormValues,
    helpers: FormHelpers
  ): Promise<void> {
    console.log("Submitting values:", values);

    // Use FormData when the payload includes files — File objects cannot be
    // sent correctly as JSON in a plain HTTP request body.
    const formData = new FormData();

    (Object.entries(values) as [string, unknown][]).forEach(([key, value]) => {
      // Keep File objects as binary blobs; coerce everything else to string
      // because FormData stores non-blob fields as strings.
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value ?? ""));
      }
    });

    // In an interview this can use fetch, a GraphQL mutation, or any API client.
    // The key point: GenericForm must not be coupled to the transport layer.
    const response = await fakeApiSubmit(values);

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    // Reset after a successful submit so the UI returns to a clean state.
    helpers.resetForm();
  }

  return (
    // GenericForm receives the reusable contract: initial state, a validation
    // function, and a submit function. Children describe the fields declaratively.
    <GenericForm<UserFormValues>
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {/* Basic controlled text input. */}
      <FormField name="name" label="Name" placeholder="Enter your name" />

      {/* Email uses native input semantics plus custom validation above. */}
      <FormField name="email" label="Email" type="email" placeholder="Enter your email" />

      {/* parseValue normalizes the raw DOM string to a number before storing. */}
      <FormField
        name="age"
        label="Age"
        type="number"
        parseValue={(v) => (v === "" ? "" : Number(v))}
      />

      {/* Textarea shows the same abstraction supports larger text fields. */}
      <FormField name="bio" label="Bio" as="textarea" rows={4} placeholder="Tell us about yourself" />

      {/* Select fields store one value from a known option list. */}
      <FormField
        name="role"
        label="Role"
        as="select"
        placeholder="Select a role"
        options={[
          { label: "User",    value: "user" },
          { label: "Admin",   value: "admin" },
          { label: "Manager", value: "manager" },
        ]}
      />

      {/* Custom components such as DatePicker plug into the same field API. */}
      <FormField name="startDate" label="Start Date" as={DatePicker} />

      {/* Radio options share one field name and store the selected option value. */}
      <FormField
        name="contactMethod"
        label="Preferred Contact Method"
        type="radio"
        options={[
          { label: "Email", value: "email" },
          { label: "Phone", value: "phone" },
        ]}
      />

      {/* Checkbox fields store booleans, not strings. */}
      <FormField name="agree" label="I agree to the terms" type="checkbox" />

      {/* File input stores the selected File so submit can append it to FormData. */}
      <FormField
        name="resume"
        label="Resume"
        type="file"
        parseValue={(files) => (files as FileList)?.[0] ?? null}
      />

      {/* SubmitButton reads GenericForm context to disable itself while submitting. */}
      <SubmitButton>Create User</SubmitButton>
    </GenericForm>
  );
}
