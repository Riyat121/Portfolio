import AnimatedText from "./AnimatedText";

export default function SectionHeading({ title, className = "" }) {
  return (
    <AnimatedText
      as="h2"
      text={title}
      scroll
      className={`display text-[clamp(3.2rem,9vw,8rem)] ${className}`}
    />
  );
}
