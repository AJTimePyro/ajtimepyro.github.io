import type { Season, TimeSegment } from '@/types/sky';

export type RGBColor = [number, number, number];
export type SegmentColors = Record<TimeSegment, RGBColor>;
export type SeasonSkyColors = Record<Season, SegmentColors>;

export const SEASON_SKY_COLORS: SeasonSkyColors = {
  winter: {
    predawn: [30, 40, 60],
    sunrise: [255, 183, 143],
    morning: [210, 220, 230],
    noon: [200, 210, 220],
    afternoon: [215, 200, 190],
    sunset: [255, 140, 120],
    dusk: [90, 70, 90],
    night: [20, 30, 48],
  },
  spring: {
    predawn: [35, 40, 70],
    sunrise: [255, 210, 190],
    morning: [200, 225, 250],
    noon: [190, 225, 255],
    afternoon: [210, 220, 240],
    sunset: [255, 170, 150],
    dusk: [100, 80, 120],
    night: [20, 25, 45],
  },
  summer: {
    predawn: [45, 40, 40],
    sunrise: [255, 200, 140],
    morning: [255, 230, 190],
    noon: [255, 244, 214],
    afternoon: [255, 210, 160],
    sunset: [255, 100, 60],
    dusk: [90, 55, 60],
    night: [40, 30, 20],
  },
  monsoon: {
    predawn: [30, 35, 40],
    sunrise: [150, 160, 160],
    morning: [130, 145, 145],
    noon: [110, 120, 115],
    afternoon: [120, 125, 120],
    sunset: [140, 110, 100],
    dusk: [50, 55, 60],
    night: [15, 20, 22],
  },
  autumn: {
    predawn: [25, 30, 55],
    sunrise: [255, 190, 120],
    morning: [180, 215, 250],
    noon: [160, 210, 255],
    afternoon: [200, 200, 230],
    sunset: [255, 150, 80],
    dusk: [80, 60, 100],
    night: [10, 15, 35],
  },
};