import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  label: string;
  className?: string;
}

const ProgressBar = ({ value, label, className }: ProgressBarProps) => {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface", className)}
    >
      <motion.div
        className="h-full rounded-full bg-red"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;
