import { NAV } from "@/constants/nav";
import { useLang } from "@/features/profile/langStore";
import { t } from "@/lib/i18n";
import { Link, NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/cn";
import ThemeToggle from "./ThemeToggle";
import { Button, ButtonLink } from "../ui/Button";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { useTheme } from "@/features/profile/themeStore";

const Navbar = () => {
  const lang = useLang((s) => s.lang);
  const { user, profile, signOut } = useAuth();
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center h-full w-34 lg:w-40">
          <img
            src={theme === "dark" ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
            alt="linn-german-logo"
            className="h-auto w-full object-contain"
          />
        </Link>

        <nav className="hidden gap-1 md:flex">
          {NAV.filter((n) => n.to !== "/profile").map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-surface font-medium text-fg"
                    : "text-muted hover:text-fg",
                )
              }
            >
              {t(label, lang)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="hidden sm:block">
            {user ? (
              <Button
                variant="secondary"
                onClick={() => void signOut()}
                className="text-red"
              >
                <LogOut size={16} />
                {t({ de: "Abmelden", en: "Log out", my: "ထွက်ရန်" }, lang)}
              </Button>
            ) : (
              <ButtonLink to="/login" className="inline-flex items-center justify-center">
                <LogIn size={18} />
                {t({ de: "Anmelden", en: "Log in", my: "ဝင်ရောက်ရန်" }, lang)}
              </ButtonLink>
            )}
          </div>
        </div>

        <Link
          to="/profile"
          className="rounded-full shrink-0 bg-surface h-9 w-9 flex items-center justify-center"
        >
          <span className="font-medium">{profile?.first_name?.[0] ?? "-"}</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
