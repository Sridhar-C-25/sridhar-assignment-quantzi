import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { deleteCookie, getCookie } from "../services/cookie";
const Navbar = () => {
  const navigate = useNavigate();
  const token = getCookie("token");

  return (
    <nav className="bg-[#263E60] flex justify-between items-center py-1 px-3 w-full fixed top-0 left-0 right-0">
      <img
        src={logo}
        alt="..."
        width={60}
        height={37}
        className="object-cover md:cursor-pointer"
        onClick={() => navigate("/")}
      />
      {token && (
        <button
          className="font-medium text-lg"
          onClick={() => {
            deleteCookie("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
