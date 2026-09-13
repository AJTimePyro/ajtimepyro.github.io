import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import CleanLayout from '@/themes/clean/CleanLayout';
import HorrorLoading from '@/themes/horror/HorrorLoading';
import type { PortfolioData } from '@/types/portfolio';

export interface ThemeProps {
    data: PortfolioData;
}

export type ThemeComponent = ComponentType<ThemeProps>;

export interface ThemeMeta {
    id: string;
    label: string;
    component: ThemeComponent;
}

export const DEFAULT_THEME_ID = 'clean' as const;

export const THEMES: Record<string, ThemeMeta> = {
    clean: {
        id: DEFAULT_THEME_ID,
        label: 'Clean',
        component: CleanLayout,
    },
    horror: {
        id: 'horror',
        label: 'Horror',
        component: dynamic(() => import('@/themes/horror/HorrorLayout'), {
            ssr: false,
            loading: HorrorLoading,
        }),
    },
};
