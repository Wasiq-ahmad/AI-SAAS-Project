import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with real API call
    console.log("Email submitted:", email);

    // Reset the form
    setSubmitted(true);
    setEmail("");
  };
  return (
    <div className="md:flex md:mr-[200px] md:mt-[200px] md:mb-[100px] md:ml-[150px] md:gap-6">
      <div className="md:flex md:flex-col md:gap-2.5 md:w-[450px]">
        <img className="md:w-[165px]" src={logo} alt="" />
        <p>
          Experience the power of AI with QuickAi.
          <br /> Transform your content creation with our suite of premium AI
          tools. Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="md:ml-10 md: w-[100px]">
        <p className="font-bold mb-2">Company</p>
        <ul className="flex flex-col gap-1">
          <li>
            <NavLink
              to="/"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactus"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="md:w-[400px] md:ml-7">
        <p className="font-bold">Subscribe to our newsletter</p>
        <p>
          The latest news, articles, and resources, sent to your inbox weekly.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-2 mt-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 w-full sm:w-[250px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>

          {submitted && (
            <p className="text-green-600 mt-2 sm:mt-0 sm:ml-4">Thank you!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Footer;
