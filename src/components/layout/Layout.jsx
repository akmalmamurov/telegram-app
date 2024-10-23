import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { loadingImg } from "@/assets/images";
import useTelegramStore from "@/context/telegram";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const { tg, userId } = useTelegramStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (tg) {
      tg?.ready();
    }
  }, [tg, userId]);

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
    <div className="h-screen flex flex-col bg-bodyColor">
      <div className="flex-grow px-5 py-2 overflow-y-auto scrollbar-none">
        <Outlet />
      </div>
      <div className="flex-shrink-0 px-5 py-4">
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;
