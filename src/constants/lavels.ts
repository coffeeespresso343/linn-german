import type { LevelCode } from "@/types/content";

export interface LevelInfo {
  code: LevelCode;
  name: string;
  description: string;
  available: boolean;
}

export const LEVELS: LevelInfo[] = [
  {
    code: "A1",
    name: "Beginner",
    description: "Build your German foundation.",
    available: true,
  },
  {
    code: "A2",
    name: "Elementary",
    description: "Handle everyday situations with confidence.",
    available: false,
  },
  {
    code: "B1",
    name: "Intermediate",
    description: "Express opinions and tell experiences.",
    available: false,
  },
  {
    code: "B2",
    name: "Upper Intermediate",
    description: "Discuss complex topics fluently.",
    available: false,
  },
  {
    code: "C1",
    name: "Advanced",
    description: "Use German flexibly and precisely.",
    available: false,
  },
  {
    code: "C2",
    name: "Mastery",
    description: "Understand virtually everything.",
    available: false,
  },
];
