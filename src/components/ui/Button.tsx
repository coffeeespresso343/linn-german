import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-dark",
  secondary: "border border-border bg-card text-fg hover:bg-surface",
  ghost: "text-fg hover:bg-surface",
};
const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

const styles = (variant: Variant = "primary", size: Size = "md") =>
  cn(base, variants[variant], sizes[size]);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = ({ variant, size, className, ...rest }: ButtonProps) => {
  return <button className={cn(styles(variant, size), className)} {...rest} />;
};

export interface ButtonLinkProps extends LinkProps {
  variant?: Variant;
  size?: Size;
}

export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <Link className={cn(styles(variant, size), className)} {...rest} />;
}
