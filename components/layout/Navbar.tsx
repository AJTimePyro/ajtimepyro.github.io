import React from "react";
import { Flame, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const [activeSection, setActiveSection] = React.useState("home");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = ["home", "about", "tech-stack", "projects", "contact"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-6 border-b border-red-900 flex justify-between items-center fixed w-screen top-0 backdrop-blur-md bg-black/60 z-50">
      <div className="rgb-line absolute bottom-0 left-0 w-full h-0.5"></div>
      <div className="flex items-center gap-2">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 text-red-600 animate-pulse">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <path
                d="M50 5 L61 40 L97 40 L68 61 L79 95 L50 75 L21 95 L32 61 L3 40 L39 40 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>
          <Flame className="absolute inset-0 m-auto text-red-500 animate-flicker h-6 w-6" />
        </div>
        <span className="text-xl font-demon tracking-widest">AJTIMEPYRO</span>
      </div>

      <nav>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium">
          {navItems.map((item) => (
            <Link
              href={`#${item}`}
              key={item}
              onClick={() => {
                scrollToSection(item);
                setActiveSection(item);
              }}
              className={`relative px-1 py-2 uppercase text-base font-medium transition-colors ${activeSection === item
                ? "text-red-500"
                : "text-gray-500 hover:text-red-400"
                }`}
            >
              {item}
              {activeSection === item && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-red-700 hover:text-red-500"
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