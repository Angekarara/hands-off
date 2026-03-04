import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/auth";
import { clearToken } from "../../auth/token";

export const Navbar = () => {
  const baseLinkClass = "px-3 py-1 rounded-md text-sm font-medium";
  const authenticated = isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav className="bg-green-950 flex justify-between px-10 rounded-b-md py-5 text-[#fdf5ea] mx-10">
      <div className="flex flex-col gap-0.5">
        <div className="text-3xl font-bold">Fridge Guard</div>
        <div>Collaborative Tracking</div>
      </div>
      <div className="flex items-center gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive ? "bg-[#fdf5ea] text-green-950" : "text-[#fdf5ea]"
            }`
          }
        >
          Items
        </NavLink>
        {authenticated ? (
          <button
            type="button"
            onClick={handleLogout}
            className={`${baseLinkClass} bg-[#fdf5ea] text-green-950`}
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${baseLinkClass} ${
                  isActive ? "bg-[#fdf5ea] text-green-950" : "text-[#fdf5ea]"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${baseLinkClass} ${
                  isActive ? "bg-[#fdf5ea] text-green-950" : "text-[#fdf5ea]"
                }`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
