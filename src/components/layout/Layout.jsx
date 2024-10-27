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
      <div className="flex-grow px-5 pt-10 pb-32 overflow-y-auto">
        <Outlet />
      </div>
      <aside className="fixed bottom-0 w-full px-5 z-10 py-[31px] bg-bodyColor">
        <Navbar />
      </aside>
    </div>
  );
};

export default Layout;
