import type { Season, TimeSegment } from "@/types/sky";
import { getSkyTransition, type SkyTransition } from "./skyInterpolation";

export type RGBColor = [number, number, number];

export interface SegmentGradient {
  top: RGBColor;
  bottom: RGBColor;
}

export interface CurrentSkyState extends SkyTransition {
  topColor: string;
  bottomColor: string;
}

export const SEASON_PALETTES: Record<
  Season,
  Record<TimeSegment, SegmentGradient>
> = {
  winter: {
    predawn: { top: [20, 25, 45], bottom: [40, 50, 75] },
    sunrise: { top: [255, 170, 120], bottom: [255, 200, 170] },
    morning: { top: [180, 200, 225], bottom: [215, 225, 235] },
    noon: { top: [170, 195, 220], bottom: [210, 218, 228] },
    afternoon: { top: [195, 185, 175], bottom: [225, 210, 200] },
    sunset: { top: [255, 120, 90], bottom: [255, 160, 140] },
    dusk: { top: [65, 50, 70], bottom: [100, 80, 100] },
    night: { top: [10, 15, 30], bottom: [25, 35, 55] },
  },
  spring: {
    predawn: { top: [25, 28, 55], bottom: [45, 50, 80] },
    sunrise: { top: [255, 195, 170], bottom: [255, 220, 200] },
    morning: { top: [170, 210, 245], bottom: [210, 230, 250] },
    noon: { top: [155, 210, 250], bottom: [200, 230, 255] },
    afternoon: { top: [185, 205, 235], bottom: [215, 225, 245] },
    sunset: { top: [255, 150, 125], bottom: [255, 185, 165] },
    dusk: { top: [75, 58, 95], bottom: [110, 90, 130] },
    night: { top: [12, 15, 30], bottom: [25, 30, 52] },
  },
  summer: {
    predawn: { top: [35, 28, 28], bottom: [55, 45, 45] },
    sunrise: { top: [255, 185, 110], bottom: [255, 215, 160] },
    morning: { top: [245, 220, 170], bottom: [255, 235, 200] },
    noon: { top: [245, 235, 195], bottom: [255, 248, 220] },
    afternoon: { top: [245, 200, 140], bottom: [255, 218, 175] },
    sunset: { top: [255, 80, 40], bottom: [255, 120, 80] },
    dusk: { top: [70, 40, 42], bottom: [100, 62, 68] },
    night: { top: [25, 18, 10], bottom: [48, 35, 25] },
  },
  monsoon: {
    predawn: { top: [22, 26, 32], bottom: [35, 40, 48] },
    sunrise: { top: [70, 80, 88], bottom: [85, 96, 104] },
    morning: { top: [52, 64, 72], bottom: [78, 92, 100] },
    noon: { top: [44, 54, 60], bottom: [68, 80, 88] },
    afternoon: { top: [48, 58, 66], bottom: [74, 86, 95] },
    sunset: { top: [58, 52, 54], bottom: [86, 76, 78] },
    dusk: { top: [35, 38, 42], bottom: [58, 62, 68] },
    night: { top: [8, 12, 15], bottom: [20, 25, 30] },
  },
  autumn: {
    predawn: { top: [18, 20, 40], bottom: [32, 38, 65] },
    sunrise: { top: [255, 175, 95], bottom: [255, 200, 140] },
    morning: { top: [155, 200, 245], bottom: [190, 220, 250] },
    noon: { top: [135, 195, 250], bottom: [175, 215, 255] },
    afternoon: { top: [180, 180, 215], bottom: [210, 208, 238] },
    sunset: { top: [255, 130, 55], bottom: [255, 165, 100] },
    dusk: { top: [58, 42, 75], bottom: [90, 70, 110] },
    night: { top: [5, 8, 22], bottom: [15, 20, 42] },
  },
};

export function lerpColor(c1: RGBColor, c2: RGBColor, t: number): RGBColor {
  const clampedT = Math.max(0, Math.min(1, t));
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * clampedT),
    Math.round(c1[1] + (c2[1] - c1[1]) * clampedT),
    Math.round(c1[2] + (c2[2] - c1[2]) * clampedT),
  ];
}

export function getSkyGradientColors(date: Date = new Date()): CurrentSkyState {
  const transition = getSkyTransition(date);
  const palette = SEASON_PALETTES[transition.season];
  const fromColors = palette[transition.segment];
  const toColors = palette[transition.nextSegment];

  const top = lerpColor(
    fromColors.top,
    toColors.top,
    transition.segmentProgress,
  );
  const bottom = lerpColor(
    fromColors.bottom,
    toColors.bottom,
    transition.segmentProgress,
  );

  return {
    ...transition,
    topColor: `rgb(${top[0]}, ${top[1]}, ${top[2]})`,
    bottomColor: `rgb(${bottom[0]}, ${bottom[1]}, ${bottom[2]})`,
  };
}
