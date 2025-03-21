import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase.js";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user] = useAuthState(auth);

  return (
    <div
      className={`h-screen bg-gray-300 text-black ${
        isOpen ? "w-64" : "w-16"
      } fixed left-0 top-0 transition-all duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 text-xl text-black"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="flex flex-col items-center mt-14">
        <div className="text-2xl font-bold mb-6">
          {isOpen ? "Dashboard" : "DB"}
        </div>

        <nav className="w-full">
          <SidebarItem
            to="/dashboard"
            icon={<FaHome />}
            text="Home"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/create-resume"
            icon={<FaFileAlt />}
            text="Create Resume"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/edit-resume"
            icon={<FaCog />}
            text="Settings"
            isOpen={isOpen}
          />
        </nav>

        {/* Logout Button */}
        {user && (
          <Button
            className="bg-red-500 hover:bg-red-600 flex items-center gap-2 mt-6"
            onClick={() => signOut(auth)}
          >
            <FaSignOutAlt />
            {isOpen && "Logout"}
          </Button>
        )}
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, text, isOpen }) => {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 hover:bg-white rounded transition-all"
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="ml-3">{text}</span>}
    </Link>
  );
};

export default Sidebar;
