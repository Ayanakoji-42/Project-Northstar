import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000000) return `${(xp / 1000000).toFixed(1)}M`;
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`;
  return xp.toString();
}

export const LEVELS = [
  { level: 1, title: "Novice", xpRequired: 0 },
  { level: 2, title: "Beginner", xpRequired: 500 },
  { level: 3, title: "Disciplined", xpRequired: 1500 },
  { level: 4, title: "Scholar", xpRequired: 3500 },
  { level: 5, title: "Strategist", xpRequired: 7000 },
  { level: 6, title: "Builder", xpRequired: 13000 },
  { level: 7, title: "Warrior", xpRequired: 22000 },
  { level: 8, title: "Sage", xpRequired: 35000 },
  { level: 9, title: "Master", xpRequired: 55000 },
  { level: 10, title: "Legend", xpRequired: 100000 },
];

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || LEVELS[i];
    }
  }
  const progress = next.xpRequired > current.xpRequired
    ? ((xp - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100
    : 100;
  return { current, next, progress: Math.min(progress, 100), xpToNext: Math.max(0, next.xpRequired - xp) };
}
