import type { Season, TimeSegment } from '@/types/sky';
import { getSeason, getDayProgress } from './sunTimes';

export interface SkyTransition {
    segment: TimeSegment;
    nextSegment: TimeSegment;
    season: Season;
    isDaytime: boolean;
    segmentProgress: number;
    remainingDurationSec: number;
    progress: number;
}

const DAY_RATIOS = {
    morning: 0.06,
    noon: 0.35,
    afternoon: 0.65,
    sunset: 0.94,
} as const;

const NIGHT_RATIOS = {
    night: 0.08,
    predawn: 0.85,
} as const;

type StopEntry = [TimeSegment, number];

function buildStopPositions(dayFraction: number): StopEntry[] {
    const nightFraction = 1 - dayFraction;

    return [
        ['sunrise', 0],
        ['morning', DAY_RATIOS.morning * dayFraction],
        ['noon', DAY_RATIOS.noon * dayFraction],
        ['afternoon', DAY_RATIOS.afternoon * dayFraction],
        ['sunset', DAY_RATIOS.sunset * dayFraction],
        ['dusk', dayFraction],
        ['night', dayFraction + NIGHT_RATIOS.night * nightFraction],
        ['predawn', dayFraction + NIGHT_RATIOS.predawn * nightFraction],
    ];
}

export function getSkyTransition(date: Date): SkyTransition {
    const { isDaytime, progress, sunrise, sunset } = getDayProgress(date);
    const dayFraction = (sunset - sunrise) / 24;

    const season = getSeason(date);
    const stops = buildStopPositions(dayFraction);

    for (let i = 0; i < stops.length; i++) {
        const [segment, pos] = stops[i];
        const nextIndex = (i + 1) % stops.length;
        const [nextName, nextPos] = stops[nextIndex];
        const boundary = nextPos === 0 ? 1 : nextPos;

        if (progress >= pos && progress < boundary) {
            const segmentProgress = (progress - pos) / (boundary - pos);
            const remainingDurationSec = (boundary - progress) * 24 * 3600;

            return {
                segment,
                nextSegment: nextName,
                season,
                isDaytime,
                segmentProgress,
                remainingDurationSec,
                progress,
            };
        }
    }

    const firstSegment = stops[0][0];
    const secondSegment = stops[1][0];
    const firstDurationSec = stops[1][1] * 24 * 3600;

    return {
        segment: firstSegment,
        nextSegment: secondSegment,
        season,
        isDaytime: true,
        segmentProgress: 0,
        remainingDurationSec: firstDurationSec,
        progress: 0,
    };
}