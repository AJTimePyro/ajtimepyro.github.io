"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface RevealTextProps {
  children: string
  className?: string
  delay?: number // in milliseconds
}

export const RevealText = ({ children, className, delay = 0 }: RevealTextProps) => {
  const textRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              elementRef.current?.classList.add("animate-in")
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (textRef.current) {
      elementRef.current = textRef.current
      observer.observe(textRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay])

  // Split text into individual characters for animation
  const characters = children.split("")

  return (
    <div className={cn("inline-block", className)} ref={textRef}>
      {characters.map((char, index) => (
        <span
          key={index}
          className="inline-block opacity-0 translate-y-full transition-all duration-300"
          style={{
            transitionDelay: `${index * 30}ms`,
            animationDelay: `${index * 30}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}

      <style jsx>{`
        .animate-in > span {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

