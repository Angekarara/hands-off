import { Outlet } from "react-router-dom";
import { Navbar } from "../navigations/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#fdf5ea]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
