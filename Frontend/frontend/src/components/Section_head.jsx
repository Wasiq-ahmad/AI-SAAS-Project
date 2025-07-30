function Section_head({ title, para }) {
  return (
    <div>
      <div className="md:flex md:flex-col md:justify-center md:items-center md:gap-4">
        <h2 className="md:text-5xl md:font-bold">{title}</h2>
        <p className="md:w-[510px] md:text-center">{para}</p>
      </div>
    </div>
  );
}

export default Section_head;
