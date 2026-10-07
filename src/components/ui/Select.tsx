import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

interface SelectProps extends ComponentProps<"select"> {
  label: string;
}

const Select = ({ label, id, className, children, ...rest }: SelectProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        className={cn(
          "h-11 w-full rounded-xl border border-border bg-card px-3",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
