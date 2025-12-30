import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "bg-gray-800 text-white"
         : "text-gray-300 hover:bg-gray-700 hover:text-white"
     }`;

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      <h1 className="text-xl font-bold">Mini Search Engine</h1>

      <div className="flex items-center space-x-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/upload" className={navLinkClass}>
          Upload
        </NavLink>

        <NavLink to="/search" className={navLinkClass}>
          Search
        </NavLink>

        <NavLink to="/profile" className={navLinkClass}>
          Profile
        </NavLink>

        <NavLink to="/documents" className={navLinkClass}>
          Documents
        </NavLink>

        <NavLink to="/public" className={navLinkClass}>
          Public
        </NavLink>

        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-white text-black rounded-md text-sm font-medium
                     hover:bg-gray-200 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
