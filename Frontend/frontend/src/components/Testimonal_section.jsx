import Card from "./Card";
import Section_head from "./Section_head";
import Section from "./Section";
import star from "../assets/star.png";
import dullstar from "../assets/dullstar.png";

function Testimonal_section() {
  const testi_head = {
    title: "Loved by Creators",
    para: "Don't just take our word for it. Here's what our users are saying.",
  };
  const tools = [
    {
      title: "AI Assistant",
      description:
        "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
      image: dullstar,
    },
    {
      title: "AI Article Writer",
      description:
        "ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
      image: star,
    },
    {
      title: "Blog Title Generator",
      description:
        "ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",

      image: star,
    },
  ];

  return (
    <div>
      <Section
        title={testi_head.title}
        para={testi_head.para}
        tools={tools}
        CardComponent={Card}
      />
    </div>
  );
}

export default Testimonal_section;
