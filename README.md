# ✨ AJTimePyro Portfolio

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

Portfolio website for Abhijeet Gupta (AJTimePyro).

The interface updates its background, lighting, and color contrast in real time based on the local time of day, season, and calculated solar and lunar positions (calibrated for Delhi and nearby regions).

---

## 🌤️ How the sky engine works

The site runs a client-side atmospheric engine that calculates solar and lunar positions from astronomical equations.

```
                  ┌─────────────────────────────────┐
                  │       Living Sky Engine         │
                  │ (Real-time Astronomical Math)   │
                  └───────────────┬─────────────────┘
                                  │
      ┌───────────────────────────┼───────────────────────────┐
      ▼                           ▼                           ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│ Celestial Body│           │ Seeded PRNG   │           │ Dynamic UI    │
│  Simulation   │           │ Constellation │           │ Contrast &    │
│ (Sun & Moon)  │           │   & Clouds    │           │ Color Tokens  │
└───────────────┘           └───────────────┘           └───────────────┘
```

### Eight day segments and five seasons

The day is divided into eight segments based on calculated sunrise and sunset times:
- Predawn (dark blue twilight before sunrise)
- Sunrise (amber horizon light)
- Morning (clear daylight)
- Noon (midday brightness)
- Afternoon (soft afternoon light)
- Sunset (orange and gold horizon glow)
- Dusk (evening twilight)
- Night (dark navy sky)

The sky colors also shift across five seasonal palettes: winter, spring, summer, monsoon, and autumn. During monsoon season, the sky shifts to overcast slate tones, and typography switches to light text for higher contrast.

Colors transition smoothly between segments using RGB linear interpolation (`lerpColor`) evaluated every 90 seconds, combined with CSS `@property` transitions to avoid abrupt color snaps.
 
Note: Solar calculations (sunrise, sunset, and day progress) and seasonal cycles are calibrated for Delhi and nearby regions.

---

### ☀️ Sun trajectory and golden hour

The sun travels along an inverted parabolic arc across the sky (`y = 85 - arc * 70`).

During sunrise and sunset, the corona expands with an amber glow (`rgba(255, 172, 77)`) and orange gradient core. During midday, the sun renders as a pale gold disc with wide ambient diffusion.

---

### 🌙 Calculated moon phases

The lunar engine uses the known astronomical new moon on January 11, 2024 at 11:57 UTC as a reference epoch and tracks the 29.53058867-day synodic month.

From the current timestamp, it computes the moon age, illumination percentage `(1 - cos(2π * phase)) / 2`, and selects the matching icon from 28 Weather Icons (`WiMoon...`). The lunar halo and drop shadow scale in opacity and blur as the illuminated fraction changes.

---

### 🌌 Deterministic night stars

Stars are generated with a Mulberry32 pseudo-random number generator seeded by date.

The seed logic (`getNightSeed`) treats pre-dawn hours before sunrise as part of the previous calendar day. This means reloading the page at 2:00 AM produces the exact same star coordinates as the evening before. Different nights produce a different constellation.

The field renders 85 stars across three tiers:
- Faint background stars (70% of total)
- Medium twinkling stars (25% of total)
- Prominent stars with dual box-shadow glow (5% of total)

Each star has an independent shimmer duration and offset.

---

### ☁️ Drifting clouds with daily seeds

Clouds use a deterministic day seed (`getDaySeed`). Each cloud's horizontal drift animation delay is tied to the current second of the day (`getSecondsIntoDay`). If you refresh the page at 3:15 PM, the cloud appears at the exact position expected for that second and continues drifting across the viewport.

Cloud density adjusts by season, with wider spacing in dry seasons (winter and summer at 700px intervals) and tighter spacing in monsoon season (320px intervals). The clouds use multiple rounded puffs with CSS blur filters and a vertical gradient mask, fading out smoothly as the user scrolls down the page.

---

### Dynamic UI contrast

Cards, chips, buttons, and text adapt their color variables to match the active sky segment:
- Daytime segments use light cards (`rgba(252, 250, 247, 0.96)`) with dark slate typography.
- Night, dusk, and predawn use dark cards (`rgba(20, 24, 32, 0.95)`) with light typography.
- Accent colors and border highlights update based on the seasonal palette.

---

## 🎮 Sky controller (dev tools)

The site includes a controller panel for testing sky transitions and lighting states.

- Keyboard shortcut: Press `Ctrl + Shift + D` (or `Cmd + Shift + D` on macOS).
- On-screen button: Click the `Sky Ctrl` button in the bottom-right corner.

The panel provides:
- Quick buttons for each of the eight day segments and five seasons.
- A 24-hour time slider (`00:00` to `23:59`) to scrub through lighting changes minute by minute.
- A date input with `-1d`, `Today`, and `+1d` steppers to inspect moon phases and star seeds across days.
- A playback engine with speed multipliers (`1x`, `10x`, `60x`, `300x`, `1200x`) that runs a continuous cycle via `requestAnimationFrame`.
- Telemetry showing calculated sunrise and sunset times, active moon phase, illumination percentage, and day cycle progress.
- A button to reset the view to your local device clock.

---

## 🛠️ Tech stack

| Technology | Purpose |
| :--- | :--- |
| Next.js 16 (App Router) | Application structure, routing, static generation |
| React 19 | Client component rendering and hooks |
| TypeScript 5 | Type definitions for data models and math utilities |
| Tailwind CSS v4 | Utility classes and layout structure |
| Vanilla CSS (`@property`) | Registered custom properties for smooth color interpolation |
| Motion (`motion/react`) | Scroll and section entrance animations |
| Lucide React & React Icons | UI iconography and lunar phase icons (`react-icons/wi`) |
| JetBrains Mono | Monospace typography via `next/font` |

---

## 📂 Project structure

```
├── app/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout and metadata
│   └── page.tsx                 # Dynamic theme renderer with Suspense
├── data/
│   └── resume-data.ts           # Portfolio data (profile, projects, skills, experience)
├── themes/
│   ├── registry.ts              # Theme registry (?theme=clean, ?theme=horror)
│   ├── clean/                   # Primary clean theme with living sky
│   │   ├── CleanLayout.tsx      # Main layout assembly
│   │   ├── SkyProvider.tsx      # Atmospheric state context and timer
│   │   ├── SkyTheme.tsx         # Syncs sky CSS custom properties to html root
│   │   ├── cleanTheme.css       # Theme tokens, card styles, and animations
│   │   ├── components/
│   │   │   ├── dev/             # SkyDevController widget
│   │   │   ├── nav/             # DotNav floating section navigator
│   │   │   ├── sections/        # Hero, Skills, Experience, Projects, Education, Footer
│   │   │   └── sky/             # ProceduralSky, SkyGradient, SunMoon, StarField, CloudLayer
│   │   └── utils/               # sunTimes, lunarPhase, skySeed, skyInterpolation, skyColors
│   └── horror/                  # Theme placeholder (to be completed later)
├── types/
│   ├── portfolio.ts             # TypeScript interfaces for portfolio data
│   └── sky.ts                   # Types for seasons, segments, and transitions
└── deprecated/                  # Previous portfolio versions
    ├── old-portfolio/           # Static HTML, CSS, and vanilla JS site
    └── old-portfolio-2/         # Next.js 15 and shadcn UI prototype
```

---

## 🧭 Evolution and archived versions

The `deprecated/` directory contains earlier versions of the site:
1. `deprecated/old-portfolio`: An earlier static portfolio written in HTML5, CSS3, and vanilla JavaScript.
2. `deprecated/old-portfolio-2`: An intermediate version built with Next.js 15 and component libraries.
3. Current version: A custom Next.js 16 implementation built around procedural sky calculations and dynamic theme switching.

---

## 🚀 Running locally

### Prerequisites
- Node.js 20 or newer
- npm, pnpm, or yarn

### Installation
```bash
git clone https://github.com/AJTimePyro/ajtimepyro.github.io.git
cd ajtimepyro.github.io
npm install
```

### Development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build
```bash
npm run build
npm run start
```

### Themes
The site supports modular layouts via the theme registry.
- Clean theme (default): `http://localhost:3000/?theme=clean`
- Horror theme: Skeleton present in the theme registry; full implementation to be added later.

---

## 👤 Author

Abhijeet Gupta (AJTimePyro)  
Full-Stack Software Engineer • 2026 B.Tech CSE  
- Portfolio: [ajtimepyro.github.io](https://ajtimepyro.github.io)
- GitHub: [@AJTimePyro](https://github.com/AJTimePyro)
- LinkedIn: [ajtimepyro](https://linkedin.com/in/ajtimepyro)
- Email: [ajtimepyro@gmail.com](mailto:ajtimepyro@gmail.com)
