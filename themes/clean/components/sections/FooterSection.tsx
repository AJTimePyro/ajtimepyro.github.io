"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa6";
import type { Profile } from "@/types/portfolio";

export default function FooterSection({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-(--sky-border) bg-black/5 backdrop-blur-sm text-(--sky-text-muted)">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 flex justify-between items-center flex-wrap gap-4">
        <p className="text-xs sm:text-sm">
          © {year} {profile.name}
        </p>

        <div className="flex gap-3 sm:gap-4 items-center">
          <Link
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent p-1.5 transition-transform hover:scale-110 active:scale-95"
            title="GitHub"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </Link>

          <Link
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent p-1.5 transition-transform hover:scale-110 active:scale-95"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </Link>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="p-2 rounded-full border border-(--sky-border) text-(--sky-text-muted) hover:border-(--accent) hover:text-(--accent) transition-all hover:scale-110 active:scale-95 cursor-pointer ml-1 sm:ml-2"
          >
            <FaArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
