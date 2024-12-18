import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Using ShadCN's button component
import { useState } from "react";
import useUserStore from "@/hooks/useUser";
import axiosInstance from "@/hooks/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
const logout = async () => {
  const response = await axiosInstance.post("/user/logoutUser");
  return response.data;
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, clearUser } = useUserStore(); // Zustand store for user state
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Logout handler
  const handleLogout = async () => {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["auth"] });

    clearUser(); // Clear user from Zustand
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-300">
            AuthApp
          </Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </Button>
        </div>

        {/* Navigation links */}
        <ul
          className={`lg:flex lg:space-x-6 ${
            isOpen ? "block" : "hidden"
          } lg:block flex-col lg:flex-row`}
        >
          <li>
            <Link to="/" className="hover:text-gray-300 block px-2 py-1">
              Home
            </Link>
          </li>

          {user ? (
            <>
              {user.role === "Admin" && (
                <li>
                  <Link to="/dashboard" className="hover:text-gray-300 block px-2 py-1">
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link to="/profile" className="hover:text-gray-300 block px-2 py-1">
                  Profile
                </Link>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white hover:text-gray-300 px-2 py-1"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300 block px-2 py-1">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-300 block px-2 py-1">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
