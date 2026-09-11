import type { Metadata } from "next"
import { Creepster } from "next/font/google"
import "./globals.css"

const creepster = Creepster({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "AJTIMEPYRO | Fullstack Developer Portfolio",
  description: "Digital nightmares crafted with precision by Abhijeet Gupta, a fullstack developer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Add preload for SVGs used in backgrounds */}
        <link rel="preload" href="/pentagram-bg.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/occult-pattern.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/summoning-circle.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/noise.png" as="image" type="image/png" />
      </head>
      <body className={creepster.className}>
          {children}
      </body>
    </html>
  )
}