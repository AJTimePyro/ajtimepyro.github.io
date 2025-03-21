"use client"

import { useEffect, useState } from "react"
import { BloodText } from "@/components/ui/blood-text"

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState("SUMMONING")
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Demonic loading messages
  const loadingMessages = [
    "SUMMONING",
    "SACRIFICING",
    "CONJURING",
    "INVOKING",
    "MANIFESTING",
    "CORRUPTING",
    "POSSESSING",
  ]

  useEffect(() => {
    // Change loading text periodically
    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length)
      setLoadingText(loadingMessages[randomIndex])
    }, 2000)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Make progress slightly unpredictable
        const increment = Math.random() * 5 + 1
        const newProgress = prev + increment

        // Complete loading
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)

          // Fade out loading screen after delay
          setTimeout(() => {
            setIsLoading(false)
          }, 800)

          return 100
        }

        return newProgress
      })
    }, 150)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black z-20 flex flex-col items-center justify-center transition-opacity duration-500">
      {/* Pentagram animation */}
      <div className="relative h-20 w-20 mb-8">
        <svg viewBox="0 0 100 100" className="h-full w-full text-red-600 animate-spin-slow">
          <path
            d="M50 5 L61 40 L97 40 L68 61 L79 95 L50 75 L21 95 L32 61 L3 40 L39 40 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-red-500 font-demon">666</span>
      </div>

      {/* Loading text */}
      <BloodText className="mb-6 text-2xl">{loadingText}</BloodText>

      {/* Progress bar */}
      <div className="w-64 h-0.5 bg-zinc-800 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="text-xs text-zinc-600 mt-2 font-mono">{Math.floor(progress)}%</div>

      {/* Flickering candles */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-20">
        <div
          className="w-1 h-8 bg-gradient-to-t from-red-600 via-yellow-400 to-transparent opacity-70 animate-flicker"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="w-1 h-8 bg-gradient-to-t from-red-600 via-yellow-400 to-transparent opacity-70 animate-flicker"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="w-1 h-8 bg-gradient-to-t from-red-600 via-yellow-400 to-transparent opacity-70 animate-flicker"
          style={{ animationDuration: "2.5s" }}
        />
      </div>

      {/* Subliminal messages that flash quickly */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-red-500 text-xl font-demon opacity-0 animate-subliminal">JOIN US</div>
        <div className="text-red-500 text-xl font-demon opacity-0 animate-subliminal" style={{ animationDelay: "3s" }}>
          STAY FOREVER
        </div>
        <div className="text-red-500 text-xl font-demon opacity-0 animate-subliminal" style={{ animationDelay: "7s" }}>
          YOUR SOUL IS MINE
        </div>
      </div>

      <style jsx>{`
        @keyframes subliminal {
          0%, 97%, 100% { opacity: 0; }
          98%, 99% { opacity: 0.7; }
        }
        
        .animate-subliminal {
          animation: subliminal 10s infinite;
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen

