import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  required?: boolean;
  error?: string;
}

export function Input({ label, required, error, id, className, ...rest }: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium">
        {label}
        {required ? "*" : null}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-xl border bg-card px-4 transition-colors text-sm placeholder:text-muted",
          error ? "border-red" : "border-border",
          className,
        )}
        {...rest}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-[11px] text-red-dark dark:text-red"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordInput({
  label,
  required,
  error,
  id,
  className,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium">
        {label}
        {required ? "*" : null}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "h-11 w-full rounded-xl border bg-card px-4 pr-10 text-sm transition-colors placeholder:text-muted",
            error ? "border-red" : "border-border",
            className,
          )}
          {...rest}
        />
        <button
          type="button"
          onClick={(e) => {
            setShowPassword((v) => !v);
            e.preventDefault();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/60"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-[11px] text-red-dark dark:text-red"
        >
          {error}
        </p>
      )}
    </div>
  );
}
