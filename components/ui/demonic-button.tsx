import React from "react"
import { cn } from "@/lib/utils"

interface DemonicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

export const DemonicButton = React.forwardRef<HTMLButtonElement, DemonicButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out",
          "overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-black",
          "before:absolute before:inset-0 before:bg-red-900/10 before:translate-y-full before:hover:translate-y-0 before:transition-transform before:duration-300",
          {
            "bg-red-800 text-white hover:bg-red-700": variant === "default",
            "bg-transparent border border-red-800 text-red-500 hover:text-red-400": variant === "outline",
            "bg-red-900 text-white hover:bg-red-800": variant === "destructive",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)
DemonicButton.displayName = "DemonicButton"

