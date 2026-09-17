import type { IconType } from "react-icons";
import {
  WiMoonNew,
  WiMoonWaxingCrescent1,
  WiMoonWaxingCrescent2,
  WiMoonWaxingCrescent3,
  WiMoonWaxingCrescent4,
  WiMoonWaxingCrescent5,
  WiMoonWaxing6,
  WiMoonFirstQuarter,
  WiMoonWaxingGibbous1,
  WiMoonWaxingGibbous2,
  WiMoonWaxingGibbous3,
  WiMoonWaxingGibbous4,
  WiMoonWaxingGibbous5,
  WiMoonWaxingGibbous6,
  WiMoonFull,
  WiMoonWaningGibbous1,
  WiMoonWaningGibbous2,
  WiMoonWaningGibbous3,
  WiMoonWaningGibbous4,
  WiMoonWaningGibbous5,
  WiMoonWaningGibbous6,
  WiMoonThirdQuarter,
  WiMoonWaningCrescent1,
  WiMoonWaningCrescent2,
  WiMoonWaningCrescent3,
  WiMoonWaningCrescent4,
  WiMoonWaningCrescent5,
  WiMoonWaningCrescent6,
} from "react-icons/wi";

export interface MoonPhaseInfo {
  phase: number; // 0 to 1 (normalized phase progress)
  ageDays: number; // 0 to 29.53 (days into current synodic cycle)
  illumination: number; // 0 to 1 (fraction of illuminated lunar surface)
  name: string;
  Icon: IconType;
}

// Reference known astronomical new moon: Jan 11, 2024 at 11:57 UTC
const KNOWN_NEW_MOON_UTC = Date.UTC(2024, 0, 11, 11, 57, 0);

// Mean synodic month: 29.53058867 days in milliseconds
const SYNODIC_MONTH_MS = 29.53058867 * 86400 * 1000;

const MOON_ICONS: IconType[] = [
  WiMoonNew,
  WiMoonWaxingCrescent1,
  WiMoonWaxingCrescent2,
  WiMoonWaxingCrescent3,
  WiMoonWaxingCrescent4,
  WiMoonWaxingCrescent5,
  WiMoonWaxing6,
  WiMoonFirstQuarter,
  WiMoonWaxingGibbous1,
  WiMoonWaxingGibbous2,
  WiMoonWaxingGibbous3,
  WiMoonWaxingGibbous4,
  WiMoonWaxingGibbous5,
  WiMoonWaxingGibbous6,
  WiMoonFull,
  WiMoonWaningGibbous1,
  WiMoonWaningGibbous2,
  WiMoonWaningGibbous3,
  WiMoonWaningGibbous4,
  WiMoonWaningGibbous5,
  WiMoonWaningGibbous6,
  WiMoonThirdQuarter,
  WiMoonWaningCrescent1,
  WiMoonWaningCrescent2,
  WiMoonWaningCrescent3,
  WiMoonWaningCrescent4,
  WiMoonWaningCrescent5,
  WiMoonWaningCrescent6,
];

function getPhaseName(phase: number): string {
  if (phase < 0.03 || phase >= 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  const diffMs = date.getTime() - KNOWN_NEW_MOON_UTC;
  const phase =
    (((diffMs % SYNODIC_MONTH_MS) + SYNODIC_MONTH_MS) % SYNODIC_MONTH_MS) /
    SYNODIC_MONTH_MS;
  const ageDays = phase * 29.53058867;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;

  const iconIndex = Math.round(phase * 28) % 28;
  const Icon = MOON_ICONS[iconIndex];
  const name = getPhaseName(phase);

  return {
    phase: Number(phase.toFixed(4)),
    ageDays: Number(ageDays.toFixed(1)),
    illumination: Number(illumination.toFixed(4)),
    name,
    Icon,
  };
}
