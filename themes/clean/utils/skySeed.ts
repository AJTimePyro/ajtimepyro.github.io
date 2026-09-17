import { getSunTimes } from "./sunTimes";

export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getNightSeed(date: Date = new Date()): number {
  const { sunrise } = getSunTimes(date);
  const currentHour = date.getHours() + date.getMinutes() / 60;
  const nightDate = new Date(date);

  if (currentHour < sunrise) {
    nightDate.setDate(nightDate.getDate() - 1);
  }

  const d = String(nightDate.getDate()).padStart(2, "0");
  const m = String(nightDate.getMonth() + 1).padStart(2, "0");
  const y = nightDate.getFullYear();

  return Number(`${d}${m}${y}`);
}

export function getDaySeed(date: Date = new Date()): number {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  return Number(`${d}${m}${y}`);
}

export function getSecondsIntoDay(date: Date = new Date()): number {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}
