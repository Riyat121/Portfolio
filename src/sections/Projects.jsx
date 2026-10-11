import { projects } from "../data/projects";
import SectionHeading from "../components/common/SectionHeading";
import ProjectShowcase from "../components/projects/ProjectShowcase";

export default function Projects() {
  return (
    <section id="work" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading title="Selected work" className="mb-12" />
      </div>
      <ProjectShowcase projects={projects} />
    </section>
  );
}
