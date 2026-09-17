"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  FolderGit2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import TagList from "../TagList";
import type { Project, ProjectStat } from "@/types/portfolio";

const CARD_LAYOUTS = {
  featured: {
    card: "rounded-xl mb-8 sm:mb-10 lg:grid lg:grid-cols-12 lg:items-stretch",
    mediaWrapper:
      "lg:col-span-7 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-(--card-border) bg-black overflow-hidden",
    mediaBorder: "",
    content: "lg:col-span-5 flex flex-col",
  },
  expanded: {
    card: "rounded-lg h-full md:col-span-2 md:grid md:grid-cols-12 md:items-stretch",
    mediaWrapper:
      "md:col-span-5 md:border-r md:border-(--card-border) flex items-center justify-center bg-black overflow-hidden",
    mediaBorder: "border-b md:border-b-0 border-(--card-border)",
    content: "md:col-span-7 flex flex-col",
  },
  standard: {
    card: "rounded-lg h-full",
    mediaWrapper: "",
    mediaBorder: "border-b border-(--card-border)",
    content: "flex-1 flex flex-col",
  },
} as const;

function ProjectMediaArea({
  project,
  borderClass = "border-b border-(--card-border)",
}: {
  project: Project;
  borderClass?: string;
}) {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const mediaList = project.media;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsZoomed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!mediaList?.length) {
    return (
      <div
        className={`w-full aspect-video bg-(--card-chip-bg) ${borderClass}`}
      />
    );
  }

  const media = mediaList[index] || mediaList[0];
  const isVideo = media.type === "video";

  return (
    <>
      <div
        className={`relative w-full aspect-video overflow-hidden group/media select-none ${
          isVideo ? "bg-black" : "bg-(--card-chip-bg)"
        } ${borderClass}`}
      >
        {isVideo ? (
          <video
            key={media.url}
            src={media.url}
            poster={media.poster}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-contain"
          />
        ) : (
          <div
            onClick={() => setIsZoomed(true)}
            className="relative w-full h-full cursor-zoom-in"
          >
            <Image
              src={media.url}
              alt={media.alt || project.title}
              fill
              unoptimized={media.url.endsWith(".svg")}
              className="object-cover object-top transition-transform duration-300 group-hover/media:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
        )}

        {mediaList.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover/media:opacity-100 transition-opacity pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i - 1 + mediaList.length) % mediaList.length);
              }}
              className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white pointer-events-auto cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i + 1) % mediaList.length);
              }}
              className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white pointer-events-auto cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {isZoomed && !isVideo && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs cursor-zoom-out"
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <Image
              src={media.url}
              alt={media.alt || project.title}
              fill
              unoptimized={media.url.endsWith(".svg")}
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

function StatCallouts({ stats }: { stats?: ProjectStat[] }) {
  if (!stats?.length) return null;

  return (
    <div
      className={`grid ${stats.length >= 3 ? "grid-cols-3" : "grid-cols-2"} gap-2 sm:gap-2.5 my-3`}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md border border-(--card-chip-border) bg-(--card-chip-bg) flex flex-col justify-center min-w-0"
        >
          <span className="font-semibold text-xs sm:text-sm text-(--accent) leading-tight truncate">
            {stat.value}
          </span>
          <span className="text-[0.625rem] sm:text-[0.6875rem] text-(--card-text-muted) uppercase tracking-wider mt-0.5 leading-snug truncate">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProjectActionButtons({
  repoUrl,
  liveUrl,
}: {
  repoUrl: string;
  liveUrl?: string;
}) {
  return (
    <div className="flex items-center gap-2 shrink-0 flex-wrap">
      <Link
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="clean-action-btn"
        aria-label="View Source Code on GitHub"
      >
        <FaGithub size={14} className="shrink-0" />
        <span>Source</span>
      </Link>

      {liveUrl && (
        <Link
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="clean-action-btn clean-action-btn-primary"
          aria-label="View Live Project"
        >
          <ExternalLink size={13} className="shrink-0" />
          <span>Live Demo</span>
        </Link>
      )}
    </div>
  );
}

function ProjectCardContent({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <div
      className={`p-5 sm:p-6 ${featured ? "lg:p-7" : ""} flex-1 flex flex-col justify-between`}
    >
      <div>
        {featured && (
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.6875rem] font-semibold tracking-wider uppercase border border-(--accent)/35 bg-(--accent)/10 text-(--accent)">
              <Sparkles size={12} className="shrink-0" />
              Featured Project
            </span>
            <ProjectActionButtons
              repoUrl={project.repoUrl}
              liveUrl={project.liveUrl}
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
          <h3
            className={`font-bold text-(--card-text) transition-colors leading-snug ${
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            {project.title}
          </h3>

          {!featured && (
            <ProjectActionButtons
              repoUrl={project.repoUrl}
              liveUrl={project.liveUrl}
            />
          )}
        </div>

        <p
          className={`font-medium text-(--accent) ${
            featured ? "text-xs sm:text-sm mt-0.5" : "text-xs"
          }`}
        >
          {project.tagline}
        </p>

        <p className="text-sm mt-2.5 leading-relaxed text-(--card-text-muted)">
          {project.description}
        </p>

        <StatCallouts stats={project.stats} />
      </div>

      <TagList items={project.stack} className="mt-3.5" />
    </div>
  );
}

function ProjectCard({
  project,
  isLastOdd = false,
}: {
  project: Project;
  isLastOdd?: boolean;
}) {
  const isFeatured = !!project.featured;
  const variant = isFeatured ? "featured" : isLastOdd ? "expanded" : "standard";
  const layout = CARD_LAYOUTS[variant];

  return (
    <div
      className={`clean-card group overflow-hidden relative flex flex-col ${layout.card}`}
    >
      <div className={layout.mediaWrapper}>
        <ProjectMediaArea project={project} borderClass={layout.mediaBorder} />
      </div>

      <div className={layout.content}>
        <ProjectCardContent project={project} featured={isFeatured} />
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const featuredProjects = projects.filter((p) => p.featured);
  const standardProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 section-heading-line">
        <FolderGit2 className="size-5 sm:size-6 shrink-0 text-(--accent)" />
        <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-tight leading-tight">
          Projects
        </h2>
      </div>

      {featuredProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}

      {standardProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {standardProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isLastOdd={
                index === standardProjects.length - 1 &&
                standardProjects.length % 2 === 1
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
