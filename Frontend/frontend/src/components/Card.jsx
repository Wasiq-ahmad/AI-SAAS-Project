// // ToolCard.jsx
// import { NavLink } from "react-router-dom";
// function Card({ title, description, image, link }) {
//   return (
//     <NavLink to={link}>
//       <div className="bg-white rounded-lg shadow-md p-6 w-full cursor-pointer max-w-sm hover:shadow-xl transition duration-300">
//         {image && (
//           <img
//             src={image}
//             alt={title}
//             className="h-12 w-12  object-cover rounded-md mb-4"
//           />
//         )}
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </NavLink>
//   );
// }

// export default Card;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({ title, description, image, link }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Prevent navigation
      e.preventDefault();
      setShowPopup(true);
    } else {
      navigate(link); // Navigate if logged in
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-white rounded-lg shadow-md p-6 w-full cursor-pointer max-w-sm hover:shadow-xl transition duration-300"
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="h-12 w-12 object-cover rounded-md mb-4"
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
            <p className="text-gray-700 mb-4">
              Please login first to use this tool.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                setShowPopup(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
