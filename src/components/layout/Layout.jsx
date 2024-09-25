import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { loadingImg } from "@/assets/images";

const Layout = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <div className="max-w-[430px] min-h-screen  mx-auto bg-[#1a1c30] flex flex-col justify-center items-center">
        <div className="flex justify-center">
          <img 
            src={loadingImg} 
            alt="Loading..." 
            className="loading-image w-full h-full object-contain" 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[430px] min-h-screen overflow-y-auto mx-auto bg-[#1a1c30] flex flex-col">
      <div className="flex-grow px-5 py-2 overflow-y-auto">
        <Outlet />
      </div>
      <div className="px-5 py-8">
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;
