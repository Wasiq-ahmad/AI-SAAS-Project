// import Section_head from "./Section_head";

// import Card from "./Card";

// function Section() {
//   return (
//     <div className=" md:flex md:flex-col md:justify-center md:mt-11 md:h-screen md:pt-28   md:bg-white">
//       <Section_head title={title} para={para} />
//       <div className="md:flex md:flex-wrap md:justify-center md:gap-8 md:mt-10 md:px-4 md:w-[1000px] md:pl-[150px] md:ml-[100px] ">
//         {tools.map((tool, index) => (
//           <Card
//             key={index}
//             title={tool.title}
//             description={tool.description}
//             image={tool.image}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Section;

import Section_head from "./Section_head";

// function Section({ title, para, tools, CardComponent }) {
//   return (
//     <div className="md:flex md:flex-col md:justify-center md:mt-11 md:pt-28 md:bg-white">
//       <Section_head title={title} para={para} />
//       <div className="md:flex md:flex-wrap md:justify-center md:gap-8 md:mt-10 md:px-4 md:w-[1000px] md:pl-[150px] md:ml-[100px]">
//         {tools.map((tool, index) => (
//           <CardComponent
//             key={index}
//             title={tool.title}
//             description={tool.description}
//             image={tool.image}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Section;

function Section({ title, para, tools = [], CardComponent }) {
  return (
    <div className="md:flex md:flex-col md:justify-center md:mt-11 md:pt-28 md:bg-white">
      <Section_head title={title} para={para} />
      <div className="md:flex md:flex-wrap md:justify-center md:gap-8 md:mt-10 md:px-4 md:w-[1000px] md:pl-[150px] md:ml-[100px]">
        {tools.length > 0 && CardComponent ? (
          tools.map((tool, index) => (
            <CardComponent
              key={index}
              title={tool.title}
              description={tool.description}
              image={tool.image}
              link={tool.link}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No items to display.</p>
        )}
      </div>
    </div>
  );
}

export default Section;
