import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function normalizeTime(hours, minutes) {
  // Normalize hours and minutes to valid ranges
  const normalizedHours =
    parseInt(hours, 10) >= 0 && parseInt(hours, 10) <= 23 ? hours : "00";
  const normalizedMinutes =
    parseInt(minutes, 10) >= 0 && parseInt(minutes, 10) <= 59 ? minutes : "00";
  return [normalizedHours, normalizedMinutes];
}

export function timeStrToDate(str) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();
  const [hh, mm] = str.split(":");
  return new Date(currentYear, currentMonth, currentDay, hh, mm);
}
