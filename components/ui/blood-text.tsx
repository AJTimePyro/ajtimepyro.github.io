'use client'

import { useEffect, useState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"

interface BloodTextProps {
  children: React.ReactNode
  className?: string
  dripping?: boolean
}

export const BloodText = ({ children, className, dripping = true }: BloodTextProps) => {
  // Use a client-side only state to handle the drips
  const [drips, setDrips] = useState<Array<{ height: number, left: number, delay: number, duration: number }>>([]);

  // Calculate drips on the client side only
  useEffect(() => {
    // Try to estimate the length of the text
    const stringChildren = children?.toString() || '';
    const textLength = stringChildren.length > 0 ? stringChildren.length : 5; // Fallback to a default

    // Create the drips with consistent client-side only random values
    const newDrips = Array.from({ length: Math.ceil(textLength / 2) }).map((_, i) => ({
      height: Math.random() * 20 + 5,
      left: (i / (textLength / 2)) * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }));

    setDrips(newDrips);
  }, [children]);

  return (
    <div className={cn("relative inline-block", className)}>
      <span className="relative z-10 text-red-600 font-demon">{children}</span>
      {dripping && (
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden h-8 pointer-events-none">
          {drips.map((drip, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-red-600 opacity-70"
              style={{
                height: `${drip.height}px`,
                left: `${drip.left}%`,
                animationDelay: `${drip.delay}s`,
                animationDuration: `${drip.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}