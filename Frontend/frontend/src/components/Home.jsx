import homepic from "../assets/homepic.png";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Section from "./Section";
import Testimonal_section from "./Testimonal_section";
import Services_section from "./Services_section";
import Footer from "./Footer";
import Copyright from "./Copyright";

function Home() {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center pt-[80px]"
        style={{ backgroundImage: `url(${homepic})` }}
      >
        <Navbar />
        <Hero />
        <Services_section />
        <Testimonal_section />
        <Footer />
        <Copyright />
        {/* <Bloggenerator /> */}
      </div>
    </>
  );
}

export default Home;
