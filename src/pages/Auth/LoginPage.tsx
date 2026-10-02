import AuthCard from "@/features/auth/components/AuthCard";
import GoogleButton from "@/features/auth/components/GoogleButton";
import LoginForm from "@/features/auth/components/LoginForm";
import MagicLinkForm from "@/features/auth/components/MagicLinkForm";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [magic, setMagic] = useState(false);

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to continue learning."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="font-medium text-fg underline">
            {" "}
            Create an account
          </Link>
        </>
      }
    >
      {magic ? <MagicLinkForm /> : <LoginForm />}

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

export default LoginPage;
