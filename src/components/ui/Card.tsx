import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const Card = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-card p-6 shadow-sm", className)}
      {...rest}
    />
  );
};

export default Card;
