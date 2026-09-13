import './cleanTheme.css';
import SkyProvider from './SkyProvider';
import SkyTheme from './SkyTheme';
import type { ThemeProps } from '@/themes/registry';

export default function CleanLayout({ data }: ThemeProps) {
    return (
        <SkyProvider>
            <SkyTheme>
                <main className="min-h-screen">
                    
                </main>
            </SkyTheme>
        </SkyProvider>
    );
}