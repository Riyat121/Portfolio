// One entry per project. Leave github / demo / caseStudy empty until you have real URLs;
// the matching button simply doesn't render. `image` can be an imported screenshot.
export const projects = [
  {
    id: "docchat",
    title: "DocChat",
    subtitle: "RAG chatbot for your documents",
    category: "AI application",
    glyph: "DC",
    description:
      "A full-stack chatbot that answers questions about uploaded PDF, DOCX and TXT files and cites its sources. It chunks documents, creates local embeddings and retrieves the top 5 chunks by cosine similarity.",
    note: "Deployed on Vercel and Render.",
    technologies: ["React.js", "Node.js", "Express.js", "Groq LLM API", "Vector embeddings", "Tailwind CSS"],
    image: null,
    github: "https://github.com/Riyat121/rag-chatApp",
    demo: "",
    caseStudy: "",
    featured: true,
  },
  {
    id: "multi-agent-research",
    title: "Multi-Agent Research Assistant",
    subtitle: "Cited research reports from live web sources",
    category: "AI application",
    glyph: "MA",
    description:
      "Search, Reader, Writer, Critic and Reviser stages share one pipeline state and produce a cited report from 5 live web sources. A critic-to-reviser loop improves the draft using review feedback.",
    note: "Tavily for live search, Cheerio for scraping with a snippet fallback.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Groq LLM", "Tavily", "Cheerio"],
    image: null,
    github: "https://github.com/Riyat121/MARS-Multi-Agent-Research-System",
    demo: "",
    caseStudy: "",
    featured: true,
  },
];
