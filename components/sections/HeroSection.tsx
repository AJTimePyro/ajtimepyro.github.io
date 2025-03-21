import React from "react";
import { RevealText } from "../ui/reveal-text";
import { DemonicButton } from "../ui/demonic-button";
import { Flame, MoveRight } from "lucide-react";

interface HeroSectionProps {
    scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-gray-900/30 to-black z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl ml-4 md:ml-12">
                    <div className="space-y-4 z-20">
                        <h2 className="text-xl md:text-2xl font-light text-gray-500 font-serif">
                            Enter the realm of
                        </h2>
                        <h1 className="text-4xl md:text-6xl font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-800 via-red-600 to-red-900">
                                Abhijeet Gupta
                            </span>
                        </h1>
                        <h3 className="text-2xl md:text-3xl font-medium text-gray-400 font-serif">
                            known as <span className="text-red-500">AJTimePyro</span>
                        </h3>
                        <RevealText delay={500}>Fullstack Developer, Python Master and Digital Necromancer...</RevealText>
                        <div className="pt-6">
                            <div className="flex items-center gap-4">
                                <DemonicButton
                                    onClick={() => scrollToSection("projects")}
                                    className="px-4 py-6 bg-red-900 hover:bg-red-800 text-white rounded-sm flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] group"
                                >
                                    <p className="text-center">Enter My Domain</p>
                                    <MoveRight className="group-hover:translate-x-1 transition-transform text-center" />
                                </DemonicButton>

                                <DemonicButton
                                    variant="outline"
                                    onClick={() => scrollToSection("contact")}
                                    className="px-4 py-6 border border-red-600 hover:bg-red-900/20 text-red-500 rounded-sm flex items-center gap-2 transition-all hover:translate-y-[-2px] group"
                                >
                                    <p className="text-center">SUMMON ME</p>
                                    <Flame className="group-hover:animate-pulse transition-all text-center" />
                                </DemonicButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}