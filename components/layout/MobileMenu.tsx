import React from "react";
import { Button } from "../ui/button";

interface MobileMenuProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  navItems: string[];
}

export default function MobileMenu({
  activeSection,
  scrollToSection,
  navItems
}: MobileMenuProps) {
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-red-900/30 z-50">
      <div className="py-4 px-6 space-y-4">
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => scrollToSection(item)}
            className={`block w-full text-left px-2 py-2 uppercase text-sm font-medium transition-colors ${
              activeSection === item 
                ? "text-red-500 bg-black/70 border border-red-900/30" 
                : "text-gray-500 hover:text-red-400 bg-black/50"
            }`}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}