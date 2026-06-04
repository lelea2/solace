export default async function submitForm(values: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to submit form.");
  }

  return response.json();
}