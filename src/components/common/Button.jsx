import { ArrowUpRight } from "lucide-react";

/** Link styled as a button. External URLs open safely in a new tab. */
export default function Button({ href, variant = "ghost", children, icon = false, className = "", onClick, ...rest }) {
  const external = /^https?:\/\//.test(href);
  const cls = `btn ${variant === "lime" ? "btn-lime" : ""} ${className}`;
  return (
    <a
      href={href}
      className={cls}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {icon && <ArrowUpRight size={18} aria-hidden="true" />}
    </a>
  );
}
