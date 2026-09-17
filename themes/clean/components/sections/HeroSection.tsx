"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  FileText,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type { Profile } from "@/types/portfolio";

const staggerDelay = 0.08;

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="hero"
      className="min-h-svh flex flex-col justify-center relative max-w-4xl mx-auto px-4 sm:px-8"
    >
      <div className="max-w-3xl">
        <motion.h1
          className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: staggerDelay * 0 }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl font-medium mt-3 text-(--accent)"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: staggerDelay * 1 }}
        >
          {profile.role}
        </motion.p>

        <motion.div
          className="flex items-center gap-4 mt-3 flex-wrap text-sm text-(--sky-text-muted)"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: staggerDelay * 2 }}
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {profile.location}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Mail size={16} className="shrink-0" />
            <Link href={`mailto:${profile.email}`} className="link-accent">
              {profile.email}
            </Link>
          </span>
        </motion.div>

        <motion.p
          className="text-base leading-relaxed mt-6 max-w-[65ch]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: staggerDelay * 3 }}
        >
          {profile.summary}
        </motion.p>

        <motion.div
          className="flex items-center gap-3 mt-8 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: staggerDelay * 4 }}
        >
          <Link
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="clean-card inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium no-underline cursor-pointer shadow-xs hover:border-(--accent) hover:text-(--accent)"
          >
            <FaGithub size={18} />
            GitHub
          </Link>

          <Link
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="clean-card inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium no-underline cursor-pointer shadow-xs hover:border-(--accent) hover:text-(--accent)"
          >
            <FaLinkedin size={18} />
            LinkedIn
          </Link>

          <Link
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-(--accent) bg-(--accent) text-sm font-semibold no-underline transition-all cursor-pointer shadow-sm text-white hover:brightness-110"
          >
            <FileText size={18} className="shrink-0" />
            Resume
            <ArrowUpRight size={16} className="opacity-75 -ml-0.5 shrink-0" />
          </Link>
        </motion.div>
      </div>

      <Link
        href="#skills"
        aria-label="Scroll to Skills section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[bounce-down_2s_ease-in-out_infinite] transition-colors text-(--sky-text-muted) hover:text-(--accent)"
      >
        <ChevronDown size={24} className="shrink-0" />
      </Link>
    </section>
  );
}
