import { NavLink } from "react-router-dom";

function Regcard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-300">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-6">
          Welcome!
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Do you want to login or register?
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <NavLink
            to="/login"
            className="bg-amber-600 hover:bg-amber-700 text-white text-lg font-medium px-6 py-3 rounded-lg transition duration-200"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="bg-white border border-amber-600 hover:bg-amber-100 text-amber-700 text-lg font-medium px-6 py-3 rounded-lg transition duration-200"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Regcard;
