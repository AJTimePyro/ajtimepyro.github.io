'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useSky } from './SkyProvider';

export default function SkyTheme({ children }: { children: ReactNode }) {
    const { segment, season } = useSky();
    const isFirstRender = useRef(true);

    useEffect(() => {
        const root = document.documentElement;

        if (isFirstRender.current) {
            root.style.setProperty('--sky-transition-duration', '0s');
            isFirstRender.current = false;
        } else {
            root.style.setProperty('--sky-transition-duration', '2s');
        }

        root.dataset.season = season;
        root.dataset.segment = segment;
    }, [segment, season]);

    return children;
}
