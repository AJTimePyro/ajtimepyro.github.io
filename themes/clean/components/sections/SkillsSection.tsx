import { Code2 } from "lucide-react";
import TagList from "../TagList";
import type { Skills, SkillCategory } from "@/types/portfolio";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  Languages: "Languages",
  Backend: "Backend",
  Frontend: "Frontend",
  DatabaseORM: "Database & ORM",
  CloudDevOps: "Cloud & DevOps",
  AI: "AI / ML",
};

export default function SkillsSection({ skills }: { skills: Skills }) {
  const categories = Object.entries(skills) as [SkillCategory, string[]][];

  return (
    <section
      id="skills"
      className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 section-heading-line">
        <Code2 className="size-5 sm:size-6 shrink-0 text-(--accent)" />
        <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-tight leading-tight">
          Skills
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {categories.map(([category, items]) => (
          <div key={category} className="clean-card rounded-lg p-5 sm:p-6">
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-3 text-(--card-text-muted)">
              {CATEGORY_LABELS[category]}
            </h3>
            <TagList items={items} size="md" />
          </div>
        ))}
      </div>
    </section>
  );
}
