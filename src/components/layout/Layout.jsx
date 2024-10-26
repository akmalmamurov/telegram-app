import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Loading from "../loading/Loading";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col bg-bodyColor">
      <div className="flex-grow px-5 pt-10 overflow-auto scrollbar-none">
        <Outlet />
      </div>
      <div className="flex-shrink-0 px-5 py-4">
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;
