"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import useScrollSpy from "@/hooks/useScrollSpy";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useScrollSpy(['home', 'about', 'tech-stack', 'projects']);

  // Add a blood red cursor effect
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-gray-300 relative overflow-hidden">

      {/* Custom cursor effect */}
      <div
        className="fixed w-6 h-6 rounded-full bg-red-800/50 blur-sm pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>

      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
      </main>

      <Footer />
    </div>
  );
}