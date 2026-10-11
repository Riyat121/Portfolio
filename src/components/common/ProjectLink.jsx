import { ArrowUpRight } from "lucide-react";

/** Underlined text link used inside project panels. Renders nothing without an href. */
export default function ProjectLink({ href, label, srLabel }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1.5 font-bold">
      {label}
      {srLabel && <span className="sr-only"> {srLabel}</span>}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
