import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <div className="max-w-[430px] min-h-screen mx-auto bg-[#1a1c30] flex flex-col">
      <div className="flex-grow px-5 py-10 overflow-y-auto">
        <Outlet />
      </div>
      <div className="px-5 py-10">
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;
