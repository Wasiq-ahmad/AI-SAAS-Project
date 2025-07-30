//

import Section from "./Section";
import Card from "./Card";
import assistant from "../assets/assistant.png";
import write1 from "../assets/write1.png";
import write2 from "../assets/write2.png";
import writing3 from "../assets/writing3.png";

function Services_section() {
  const head_section = {
    title: "Powerful AI Tool",
    para: "Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.",
  };

  const tools = [
    {
      title: "AI Assistant",
      description: "Create stunning visuals with our AI image generation tool.",
      image: assistant,
      link: "/dashboard/aiassistant",
    },
    {
      title: "AI Article Writer",
      description: "Generate high-quality, engaging articles on any topic.",
      image: write1,
      link: "/dashboard/aiarticleassistant",
    },
    {
      title: "Blog Title Generator",
      description: "Find the perfect, catchy title for your blog posts.",
      image: write2,
      link: "/dashboard/blogtitlegenerator",
    },
    {
      title: "Resume Reviewer",
      description: "Get your resume reviewed by AI for better job chances.",
      image: writing3,
      link: "/dashboard/resumeassistant",
    },
  ];

  return (
    <Section
      title={head_section.title}
      para={head_section.para}
      tools={tools}
      CardComponent={Card}
    />
  );
}

export default Services_section;
