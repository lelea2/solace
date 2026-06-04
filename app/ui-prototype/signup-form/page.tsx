import Link from "next/link";
import SignupForm from "@/components/ui-prototype/signup-form/SignupForm";

export const metadata = {
  title: "Sign Up — UI Prototype",
  description: "A simple sign up form component prototype.",
};
  
export default function SignupFormPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/ui-prototype"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
        >
          ← Back to UI Prototype
        </Link>

        <p className="text-slate-400 text-sm font-mono tracking-widest uppercase mb-4">
          UI Prototype · Sign Up
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Sign Up</h1>
        <p className="text-slate-400 text-lg mb-16">
          Create a new account.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

