import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema, type LoginValues } from "../schemas";
import { Input, PasswordInput } from "@/components/ui/Input";
import { signInWithPassword } from "../authService";
import { Loader, LogIn } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const { error } = await signInWithPassword(values.email, values.password);

    if (error) return setServerError(error.message);

    navigate(from, { replace: true });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Input
        label="Email"
        required
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <PasswordInput
        label="Password"
        required
        autoComplete="current-password"
        placeholder="At least 8 characters"
        {...register("password")}
        error={errors.password?.message}
      />
      {serverError && (
        <p className="text-[11px] text-red-dark dark:text-red">{serverError}</p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader size={16} className="animate-spin" />
            Signing in
          </>
        ) : (
          <>
            <LogIn size={16} />
            Login
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
