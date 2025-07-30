import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/"); // Redirect to login or home
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md  ">
      <div className="flex justify-between items-center pt-2.5 px-[100px]">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" width="168" />
        </NavLink>

        {/* Right Buttons */}
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard">
                <p className="bg-green-500 text-white px-6 py-2 rounded-full border border-black hover:bg-green-600 transition duration-200">
                  Dashboard
                </p>
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full border border-black hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/popup">
              <p className="bg-blue-500 text-white px-6 py-2 rounded-full border border-black hover:bg-blue-600 transition duration-200">
                Get started
              </p>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
