import type { Season } from '@/types/sky';

export interface DayProgress {
    isDaytime: boolean;
    progress: number;
    sunrise: number;
    sunset: number;
}

const MONTHLY_SUN_TIMES: Record<number, [number, number]> = {
    0: [7.15, 17.6],
    1: [6.95, 17.95],
    2: [6.45, 18.3],
    3: [5.85, 18.6],
    4: [5.55, 18.95],
    5: [5.4, 19.25],
    6: [5.5, 19.25],
    7: [5.7, 19.0],
    8: [6.0, 18.45],
    9: [6.2, 17.9],
    10: [6.6, 17.45],
    11: [7.0, 17.35],
};

export function getSunTimes(date: Date): { sunrise: number; sunset: number } {
    const month = date.getMonth();
    const day = date.getDate();
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    const nextMonth = (month + 1) % 12;

    const [sunriseNow, sunsetNow] = MONTHLY_SUN_TIMES[month];
    const [sunriseNext, sunsetNext] = MONTHLY_SUN_TIMES[nextMonth];

    const t = (day - 1) / daysInMonth;
    const sunrise = sunriseNow + (sunriseNext - sunriseNow) * t;
    const sunset = sunsetNow + (sunsetNext - sunsetNow) * t;

    return { sunrise, sunset };
}

export function getSeason(date: Date): Season {
    const month = date.getMonth();

    if (month === 11 || month === 0 || month === 1) return 'winter';
    if (month === 2) return 'spring';
    if (month >= 3 && month <= 5) return 'summer';
    if (month >= 6 && month <= 8) return 'monsoon';
    return 'autumn';
}

export function getDayProgress(date: Date): DayProgress {
    const { sunrise, sunset } = getSunTimes(date);
    const currentHour =
        date.getHours() +
        date.getMinutes() / 60 +
        date.getSeconds() / 3600 +
        date.getMilliseconds() / 3600000;

    const hoursSinceSunrise = ((currentHour - sunrise) % 24 + 24) % 24;
    const rawProgress = hoursSinceSunrise / 24;
    const progress = rawProgress >= 1 ? 0 : Math.max(0, rawProgress);

    const isDaytime = currentHour >= sunrise && currentHour < sunset;

    return {
        isDaytime,
        progress,
        sunrise,
        sunset,
    };
}
