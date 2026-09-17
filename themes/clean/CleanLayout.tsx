import { JetBrains_Mono } from 'next/font/google';
import './cleanTheme.css';
import SkyProvider from './SkyProvider';
import SkyTheme from './SkyTheme';
import ProceduralSky from './components/sky/ProceduralSky';
import DotNav from './components/nav/DotNav';
import HeroSection from './components/sections/HeroSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import EducationSection from './components/sections/EducationSection';
import FooterSection from './components/sections/FooterSection';
import type { ThemeProps } from '@/themes/registry';

const font = JetBrains_Mono({ subsets: ['latin'] });

export default function CleanLayout({ data }: ThemeProps) {
    return (
        <SkyProvider>
            <SkyTheme>
                <ProceduralSky />
                <DotNav />
                <main style={font.style} className="relative z-4 min-h-screen">
                    <HeroSection profile={data.profile} />
                    <SkillsSection skills={data.skills} />
                    <ExperienceSection experience={data.experience} />
                    <ProjectsSection projects={data.projects} />
                    <EducationSection education={data.education} />
                    <FooterSection profile={data.profile} />
                </main>
            </SkyTheme>
        </SkyProvider>
    );
}