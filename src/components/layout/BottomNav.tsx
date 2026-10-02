import { NAV } from "@/constants/nav";
import { useLang } from "@/features/profile/langStore";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const lang = useLang((s) => s.lang);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/80
    pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
    >
      <ul className="grid grid-cols-5 gap-1">
        {NAV.map(({ to, icon: Icon, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[10px]",
                  isActive ? "font-semibold text-red" : "text-muted",
                )
              }
            >
              <Icon size={20} />
              <span className="truncate">{t(label, lang)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
