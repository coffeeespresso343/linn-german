import AuthCard from "@/features/auth/components/AuthCard";
import GoogleButton from "@/features/auth/components/GoogleButton";
import MagicLinkForm from "@/features/auth/components/MagicLinkForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [magic, setMagic] = useState(false);

  return (
    <AuthCard
      title="Register"
      subtitle="Save your progress and learn at your own pace."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-fg underline">
            Sign in
          </Link>
        </>
      }
    >
      {magic ? <MagicLinkForm /> : <RegisterForm />}

      <p className="text-center text-sm text-muted flex items-center gap-3">
        <span className="h-px w-full bg-border" />
        or
        <span className="h-px w-full bg-border" />
      </p>

      <GoogleButton />

      <button
        type="button"
        onClick={() => setMagic(!magic)}
        className="w-full text-center text-sm font-medium underline"
      >
        {magic ? "Use a password instead" : "Email me a login link instead"}
      </button>
    </AuthCard>
  );
};

export default RegisterPage;
