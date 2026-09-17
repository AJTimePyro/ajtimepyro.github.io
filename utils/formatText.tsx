import type { ReactNode } from "react";

/**
 * Parses markdown bold (**text**) syntax into React elements with styled <strong> tags.
 */
export function renderFormattedText(
  text: string,
  strongClassName: string = "font-semibold text-(--card-text)",
): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className={strongClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
