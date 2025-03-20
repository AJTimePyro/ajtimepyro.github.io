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
    <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="py-4 px-6 space-y-4">
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => scrollToSection(item)}
            className={`block w-full text-left px-2 py-2 uppercase text-sm font-medium ${activeSection === item ? "text-white" : "text-gray-400"
              }`}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
