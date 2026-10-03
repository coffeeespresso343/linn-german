import { AuthProvider } from "@/features/auth/AuthProvider";
import LanguageSync from "@/features/profile/LanguageSync";
import { useTheme } from "@/features/profile/themeStore";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const theme = useTheme((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <AuthProvider>
          <LanguageSync />
          {children}
        </AuthProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}
