import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 rounded bg-blue-600 text-white font-medium"
      : "block px-4 py-2 rounded text-blue-600 hover:bg-blue-100 font-medium";

  return (
    <div className="w-64 bg-gray-100 h-full p-4 shadow-md ">
      <div className="flex flex-col gap-3.5 mt-6">
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard/aiassistant" className={linkClass}>
              AI Assistant
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/blogtitlegenerator" className={linkClass}>
              Blog Title Generator
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/aiarticleassistant" className={linkClass}>
              AI Article Writer
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/resumeassistant" className={linkClass}>
              Review Resume
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
