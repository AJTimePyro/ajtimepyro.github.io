"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "Profile", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "education", label: "Education", icon: GraduationCap },
] as const;

const TOP_OFFSET = 12;
const ITEM_STEP = 38;

export default function DotNav() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [settledId, setSettledId] = useState<string>("hero");
  const isLocked = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 60ms delay for button activation to sync with the sliding ring
  useEffect(() => {
    if (activeId === settledId) return;
    const timer = setTimeout(() => setSettledId(activeId), 60);
    return () => clearTimeout(timer);
  }, [activeId, settledId]);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (isLocked.current || rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 20;

        if (atBottom) {
          const lastId = NAV_ITEMS[NAV_ITEMS.length - 1].id;
          setActiveId((prev) => (prev !== lastId ? lastId : prev));
          return;
        }

        let maxVisibleHeight = 0;
        let current: string = NAV_ITEMS[0].id;

        for (const { id } of NAV_ITEMS) {
          const el = document.getElementById(id);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            current = id;
          }
        }

        setActiveId((prev) => (prev !== current ? current : prev));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (lockTimer.current) clearTimeout(lockTimer.current);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    isLocked.current = true;
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      isLocked.current = false;
    }, 900);
  };

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeId),
  );

  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2.5 py-3 px-1.5 rounded-full border border-(--sky-border) backdrop-blur-md shadow-md"
      style={{
        background: "color-mix(in srgb, var(--card-bg) 75%, transparent)",
      }}
      aria-label="Section navigation"
    >
      <div
        className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-px pointer-events-none"
        style={{ background: "var(--card-border)" }}
        aria-hidden="true"
      />

      <div
        className="absolute left-1/2 -translate-x-1/2 size-7 rounded-full border-2 border-(--accent) pointer-events-none z-10 transition-all duration-300 ease-out"
        style={{
          top: `${TOP_OFFSET + activeIndex * ITEM_STEP}px`,
          boxShadow:
            "0 0 12px color-mix(in srgb, var(--accent) 45%, transparent)",
        }}
        aria-hidden="true"
      />

      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isTarget = activeId === id;
        const isSettled = settledId === id;

        return (
          <Link
            key={id}
            href={`#${id}`}
            onClick={() => handleNavClick(id)}
            className={`group relative z-1 flex size-7 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-(--accent) bg-(--card-bg) border ${
              isSettled
                ? "text-(--accent) border-(--accent)"
                : "text-(--card-text-muted) border-(--card-border) hover:text-(--accent) hover:border-(--accent)/60"
            }`}
            aria-label={`Jump to ${label}`}
            aria-current={isTarget ? "true" : undefined}
          >
            <Icon className="size-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110" />

            <span
              className={`absolute left-full ml-3 flex items-center gap-1.5 text-xs font-medium whitespace-nowrap px-2.5 py-1 rounded-md border border-(--card-border) opacity-0 -translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-sm ${
                isTarget ? "text-(--accent)" : "text-(--card-text)"
              }`}
              style={{ background: "var(--card-bg)" }}
            >
              <Icon className="size-3 shrink-0 opacity-70" />
              <span>{label}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
