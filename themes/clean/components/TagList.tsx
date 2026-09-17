interface TagListProps {
  items: string[];
  size?: "sm" | "md";
  className?: string;
}

export default function TagList({
  items,
  size = "sm",
  className = "",
}: TagListProps) {
  if (!items?.length) return null;

  const chipClass =
    size === "md" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs";

  const gapClass = size === "md" ? "gap-2" : "gap-1.5";

  return (
    <div className={`flex flex-wrap items-center ${gapClass} ${className}`}>
      {items.map((item) => (
        <span
          key={item}
          className={`clean-chip ${chipClass} rounded-full font-medium whitespace-nowrap`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
