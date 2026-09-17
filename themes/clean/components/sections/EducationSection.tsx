import { GraduationCap } from "lucide-react";
import type { Education } from "@/types/portfolio";

export default function EducationSection({
  education,
}: {
  education: Education[];
}) {
  return (
    <section
      id="education"
      className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 section-heading-line">
        <GraduationCap className="size-5 sm:size-6 shrink-0 text-(--accent)" />
        <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-tight leading-tight">
          Education
        </h2>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={`${edu.institution}-${edu.degree}`}
            className="clean-card rounded-lg p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-sm mt-1 text-(--card-text-muted)">
                  {edu.institution}
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="clean-chip px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                    CGPA:{" "}
                    <span className="font-semibold text-(--accent)">
                      {edu.cgpa}
                    </span>
                  </span>
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-(--card-chip-border) bg-(--card-chip-bg) text-(--card-text-muted) whitespace-nowrap">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
