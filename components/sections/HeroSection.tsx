import React from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-gray-900/30 to-black z-0"></div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 z-0">
                {Array.from({ length: 72 }).map((_, i) => (
                    <div key={i} className="border-red-900/10 border"></div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl ml-4 md:ml-12">
                    <div className="space-y-4">
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
                        <p className="text-xl md:text-2xl text-gray-500">
                            Fullstack Developer, Python Master and Digital Necromancer...
                        </p>
                        <div className="pt-6">
                            <div>
                                <Button
                                    onClick={() => scrollToSection("projects")}
                                    className="bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-gray-300 px-8 py-6 rounded-md text-lg transition-all duration-300 shadow-lg border border-red-900/30"
                                >
                                    Enter My Domain
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}