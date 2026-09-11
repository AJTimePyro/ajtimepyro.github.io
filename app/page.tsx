'use client'

import { useSearchParams } from "next/navigation";
import { THEMES, DEFAULT_THEME_ID } from '@/components/themes/registry';
import { Suspense } from "react";
import { PORTFOLIO_DATA } from "@/data/resume-data";

function PortfolioRenderer() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme') ?? DEFAULT_THEME_ID;
  const ActiveLayout = (THEMES[themeParam] ?? THEMES[DEFAULT_THEME_ID]).component;

  return <ActiveLayout data={PORTFOLIO_DATA} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <PortfolioRenderer />
    </Suspense>
  );
}
