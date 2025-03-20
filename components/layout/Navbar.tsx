import React from "react";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function Navbar({
  isMenuOpen,
  toggleMenu,
  activeSection,
  scrollToSection
}: NavbarProps) {
  const navItems = ["home", "about", "tech-stack", "projects"];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-gray-800">
      <div className="rgb-line absolute bottom-0 left-0 w-full h-0.5"></div>

      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            AJTimePyro
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`relative px-1 py-2 uppercase text-sm font-medium transition-colors ${activeSection === item
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              {item}
              {activeSection === item && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          navItems={navItems}
        />
      )}
    </header>
  );
}
