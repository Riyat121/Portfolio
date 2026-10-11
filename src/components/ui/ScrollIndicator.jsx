import { scrollToTarget } from "../../animations/smoothScroll";

export default function ScrollIndicator({ className = "", ...rest }) {
  return (
    <a
      href="#about"
      onClick={(e) => {
        e.preventDefault();
        scrollToTarget("#about");
      }}
      {...rest}
      className={`inline-flex items-center gap-3 text-sm text-mute no-underline hover:text-ink ${className}`}
    >
      <span className="scroll-line relative block h-12 w-px overflow-hidden bg-line" aria-hidden="true" />
      Scroll to explore
    </a>
  );
}
