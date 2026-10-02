import { Button } from "@/components/ui/Button";
import { Input, PasswordInput } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../authService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [confirmEmail, setConfirmEmail] = useState<string | null>(null);
  const [severError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    const { data, error } = await signUp(values);

    if (error) return setServerError(error.message);
    if (data.session)
      navigate("/dashboard", { replace: true }); // email confirmation is off
    else setConfirmEmail(values.email); // email confirmation is on
  });

  if (confirmEmail) {
    return (
      <p className="rounded-xl bg-surface p-4 text-sm">
        Almost there! We sent a confirmation link to <strong>{confirmEmail}</strong>. Open
        it to activate your account.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          required
          type="text"
          autoComplete="given-name"
          placeholder="Aung"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name (optional)"
          type="text"
          autoComplete="family-name"
          placeholder="Lay"
          {...register("lastName")}
        />
      </div>

      <Input
        label="Email"
        required
        type="email"
        placeholder="you@example.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <PasswordInput
        label="Password"
        required
        placeholder="At least 8 characters"
        {...register("password")}
        error={errors.password?.message}
      />
      <PasswordInput
        label="Confirm Password"
        required
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {severError && (
        <p role="alert" className="text-[11px] text-red-dark dark:text-red">
          {severError}
        </p>
      )}

      <Button type="submit" className="w-full">
        {isSubmitting ? (
          <>
            <Loader size={16} className="animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
