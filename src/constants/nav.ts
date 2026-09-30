import type { MultilingualText } from "@/types/content";
import { BookOpen, ChartColumn, Dumbbell, House, User } from "lucide-react";

export const NAV: {
  to: string;
  icon: typeof House;
  label: MultilingualText;
  end?: boolean;
}[] = [
  { to: "/", icon: House, end: true, label: { de: "Start", en: "Home", my: "ပင်မ" } },
  { to: "/learn", icon: BookOpen, label: { de: "Lernen", en: "Learn", my: "လေ့လာရန်" } },
  {
    to: "/practice",
    icon: Dumbbell,
    label: { de: "Üben", en: "Practice", my: "လေ့ကျင့်ရန်" },
  },
  {
    to: "/progress",
    icon: ChartColumn,
    label: { de: "Fortschritte", en: "Progress", my: "တိုးတက်မှု" },
  },
  { to: "/profile", icon: User, label: { de: "Profil", en: "Profile", my: "ပရိုဖိုင်" } },
];
