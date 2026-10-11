import ProjectLink from "../common/ProjectLink";

export default function ProjectCard({ project }) {
  const { title, subtitle, category, glyph, description, note, technologies, image, github, demo, caseStudy } = project;
  return (
    <article
      data-panel
      className="group relative flex h-[min(78vh,560px)] w-[min(86vw,680px)] shrink-0 snap-start flex-col justify-between overflow-hidden border border-line bg-gradient-to-b from-surface to-bg p-6 transition-colors duration-300 hover:border-lime sm:p-8"
    >
      {image ? (
        <img src={image} alt={`${title} screenshot`} loading="lazy" className="absolute inset-0 -z-0 h-full w-full object-cover opacity-30" />
      ) : (
        <span
          aria-hidden="true"
          className="display outline-text pointer-events-none absolute -right-4 -top-6 select-none text-[clamp(9rem,26vw,17rem)] opacity-25 transition-transform duration-700 group-hover:-translate-x-3 group-hover:scale-105"
        >
          {glyph}
        </span>
      )}

      <div className="relative text-sm text-lime">{category}</div>

      <div className="relative">
        <h3 className="display mb-2 text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.95] transition-colors duration-300 group-hover:text-lime">{title}</h3>
        {subtitle && <p className="m-0 mb-3 text-ink">{subtitle}</p>}
        <p className="m-0 max-w-lg text-mute">{description}</p>
        {note && <p className="m-0 mt-3 border-l-2 border-lime pl-3 text-sm text-ink">{note}</p>}
        <ul className="mt-4 flex flex-wrap gap-2" style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }} aria-label="Technologies">
          {technologies.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-0.5 text-[0.82rem] text-ink/80">{t}</li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <ProjectLink href={demo} label="View project" srLabel={title} />
          <ProjectLink href={github} label="GitHub" srLabel={`repository for ${title}`} />
          <ProjectLink href={caseStudy} label="Case study" srLabel={title} />
        </div>
      </div>
    </article>
  );
}
