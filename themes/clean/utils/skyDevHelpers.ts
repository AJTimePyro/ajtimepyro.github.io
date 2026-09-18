import type { Season, TimeSegment } from "@/types/sky";
import { getSunTimes } from "./sunTimes";

export function seasonToDate(
  season: Season,
  baseDate: Date = new Date(),
): Date {
  const result = new Date(baseDate);
  const year = baseDate.getFullYear();

  switch (season) {
    case "winter":
      result.setFullYear(year, 0, 15);
      break;
    case "spring":
      result.setFullYear(year, 2, 21);
      break;
    case "summer":
      result.setFullYear(year, 5, 21);
      break;
    case "monsoon":
      result.setFullYear(year, 7, 1);
      break;
    case "autumn":
      result.setFullYear(year, 9, 21);
      break;
  }

  return result;
}

export function segmentToDate(
  segment: TimeSegment,
  baseDate: Date = new Date(),
): Date {
  const { sunrise, sunset } = getSunTimes(baseDate);
  const dayFraction = (sunset - sunrise) / 24;
  const nightFraction = 1 - dayFraction;

  let progressOffset = 0;
  switch (segment) {
    case "sunrise":
      progressOffset = (0.06 * dayFraction) / 2;
      break;
    case "morning":
      progressOffset = ((0.06 + 0.35) / 2) * dayFraction;
      break;
    case "noon":
      progressOffset = ((0.35 + 0.65) / 2) * dayFraction;
      break;
    case "afternoon":
      progressOffset = ((0.65 + 0.94) / 2) * dayFraction;
      break;
    case "sunset":
      progressOffset = ((0.94 + 1.0) / 2) * dayFraction;
      break;
    case "dusk":
      progressOffset = dayFraction + (0.08 * nightFraction) / 2;
      break;
    case "night":
      progressOffset = dayFraction + ((0.08 + 0.85) / 2) * nightFraction;
      break;
    case "predawn":
      progressOffset = dayFraction + ((0.85 + 1.0) / 2) * nightFraction;
      break;
  }

  const hourFloat = (sunrise + progressOffset * 24) % 24;
  const hours = Math.floor(hourFloat);
  const minutesFloat = (hourFloat - hours) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.floor((minutesFloat - minutes) * 60);

  const target = new Date(baseDate);
  target.setHours(hours, minutes, seconds, 0);
  return target;
}

export function formatDateForInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
