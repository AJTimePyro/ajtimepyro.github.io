'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSkyTransition, type SkyTransition } from './utils/skyInterpolation';

const SkyContext = createContext<SkyTransition | null>(null);

export function useSky(): SkyTransition {
    const ctx = useContext(SkyContext);
    if (!ctx) throw new Error('useSky must be used within a SkyProvider');
    return ctx;
}

export default function SkyProvider({ children }: { children: ReactNode }) {
    const [sky, setSky] = useState(() => getSkyTransition(new Date()));

    useEffect(() => {
        let timerId: ReturnType<typeof setTimeout>;

        function sync() {
            const transition = getSkyTransition(new Date());
            setSky(transition);

            // Add 200ms buffer so timer reliably triggers after crossing the segment boundary
            const delayMs = Math.max(transition.remainingDurationSec * 1000 + 200, 1000);
            timerId = setTimeout(sync, delayMs);
        }

        sync();

        const onVisibilityChange = () => {
            if (!document.hidden) {
                clearTimeout(timerId);
                sync();
            }
        };

        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            clearTimeout(timerId);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);

    return (
        <SkyContext value={sky}>
            {children}
        </SkyContext>
    );
}
