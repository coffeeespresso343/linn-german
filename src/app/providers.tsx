import { useTheme } from "@/features/profile/themeStore";
import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const theme = useTheme((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  });
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
