import { AuthProvider } from "@/features/auth/AuthProvider";
import LanguageSync from "@/features/profile/LanguageSync";
import { useTheme } from "@/features/profile/themeStore";
import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const theme = useTheme((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <LanguageSync />
        {children}
      </AuthProvider>
    </MotionConfig>
  );
}
