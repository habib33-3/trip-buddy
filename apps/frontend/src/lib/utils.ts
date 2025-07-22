/* eslint-disable @typescript-eslint/no-magic-numbers */
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCityColorByCount = (
  count: number,
  min = 3,
  max = 9
): string => {
  const clamped = Math.max(min, Math.min(count, max));
  const ratio = (clamped - min) / (max - min);
  const hue = 120 - ratio * 120;
  return `hsl(${hue}, 100%, 50%)`;
};
