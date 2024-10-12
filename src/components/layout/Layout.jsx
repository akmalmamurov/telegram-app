import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { loadingImg } from "@/assets/images";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1a1c30]">
        <img
          src={loadingImg}
          alt="Loading..."
          className="loading-image w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1a1c30]">
      {/* Outlet bo'limi asosiy kontent uchun */}
      <div className="flex-grow px-5 py-2 overflow-y-auto">
        <Outlet />
      </div>
      
      {/* Navbar bo'limi pastki qismda */}
      <div className="flex-shrink-0 px-5 py-8">
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;
