import Link from "next/link";
import { ExternalLink, Briefcase } from "lucide-react";
import { renderFormattedText } from "@/utils/formatText";
import type { Experience } from "@/types/portfolio";

export default function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}) {
  return (
    <section
      id="experience"
      className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 section-heading-line">
        <Briefcase className="size-5 sm:size-6 shrink-0 text-(--accent)" />
        <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-tight leading-tight">
          Experience
        </h2>
      </div>

      <div className="relative sm:pl-8 timeline-line">
        {experience.map((exp) => (
          <div
            key={`${exp.company}-${exp.startDate}`}
            className="relative mb-5 sm:mb-6"
          >
            {/* Timeline dot */}
            <div className="absolute -left-8 top-6 size-1.75 rounded-full translate-x-[-0.5px] hidden sm:block bg-(--accent)" />

            <div className="clean-card rounded-lg p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-sm mt-0.5 text-(--card-text-muted) flex items-center flex-wrap gap-x-1.5">
                    <span className="font-medium text-(--card-text)">
                      {exp.company}
                    </span>
                    {(exp.liveUrl || exp.loomUrl) && (
                      <>
                        <span className="opacity-60">·</span>
                        <Link
                          href={exp.liveUrl || exp.loomUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-accent inline-flex items-center gap-1 font-normal whitespace-nowrap"
                        >
                          <span>{exp.liveUrl ? "Live" : "Demo"}</span>
                          <ExternalLink size={13} className="shrink-0" />
                        </Link>
                      </>
                    )}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-(--card-chip-border) bg-(--card-chip-bg) text-(--card-text-muted) whitespace-nowrap">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </div>
              <ul className="pl-5 list-disc marker:text-(--accent) space-y-1.5 mt-3">
                {exp.highlights.map((highlight, j) => (
                  <li
                    key={j}
                    className="text-sm leading-relaxed text-(--card-text-muted)"
                  >
                    {renderFormattedText(highlight)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
