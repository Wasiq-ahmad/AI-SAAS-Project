// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// function Dashboard() {
//   return (
//     <div>
//       <Navbar />
//       <div className="">
//         <Sidebar />
//         <main className="flex-1 p-4 overflow-y-auto">
//           <Outlet />
//         </main>
//         {/* <div className="mt-4">
//           <h1 className="font-bold ">hello from wasiq</h1>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <div className="hidden md:block fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-gray-100 shadow-md z-10">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="ml-0 md:ml-64 flex-1 p-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
