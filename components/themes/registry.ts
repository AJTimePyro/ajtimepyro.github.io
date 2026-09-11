import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import CleanLayout from '@/components/themes/clean/CleanLayout';
import HorrorLoading from '@/components/themes/horror/HorrorLoading';
import { PortfolioData } from '@/types/portfolio';

export type ThemeComponent = ComponentType<{ data: PortfolioData }>;

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
        component: dynamic(() => import('@/components/themes/horror/HorrorLayout'), {
            ssr: false,
            loading: HorrorLoading,
        }),
    },
};
