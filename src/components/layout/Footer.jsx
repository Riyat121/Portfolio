import { navigation } from "../../data/navigation";
import { personalInfo } from "../../data/personalInfo";
import { scrollToTarget } from "../../animations/smoothScroll";

export default function Footer() {
  return (
    <footer className="pb-10 pt-6 text-sm text-mute">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <span>© {new Date().getFullYear()} {personalInfo.name}</span>
        <ul className="flex gap-6" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {navigation.slice(0, 4).map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="no-underline hover:text-ink"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(n.href);
                }}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
