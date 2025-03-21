"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import BloodDrips from "@/components/ui/bloodDrips"
import Navbar from "@/components/layout/Navbar"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import TechStackSection from "@/components/sections/TechStackSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import Footer from "@/components/layout/Footer"
import ContactSection from "@/components/sections/ContactSection"
import useScrollSpy from "@/hooks/useScrollSpy"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const activeSection = useScrollSpy(['home', 'about', 'tech-stack', 'projects', 'contact']);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-black text-red-500 flex flex-col overflow-x-hidden">
      <BloodDrips />
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}