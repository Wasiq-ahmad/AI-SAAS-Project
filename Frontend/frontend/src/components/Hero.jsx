import home2 from "../assets/home2.png";

function Hero() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center  md:mt-[120px] md:mr-[100px] md:ml-[100px]">
        <h1 className="text-[60px] font-bold w-[800px] text-center">
          Create amazing content with{" "}
          <span className="text-blue-600">AI tools</span>
        </h1>
        <p className="text-[16px] w-[490px] mt-4">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow
        </p>
        <div className="md:flex md:mt-5">
          <p className="bg-blue-500 rounded-[6px] pt-[10px] pb-[10px] px-[30px] mr-[30px] text-white cursor-pointer">
            start creating now
          </p>
          <p className="bg-white rounded-[6px] pt-[10px] pb-[10px] px-[30px] mr-[30px] cursor-pointer border border-white text-black">
            watch demo
          </p>
        </div>
        <img className="mt-4" src={home2} alt="" />
      </div>
    </div>
  );
}

export default Hero;
