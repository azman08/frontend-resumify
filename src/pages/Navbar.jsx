import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase.js";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleProtectedNavigation = (route) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(route);
    }
  };

  return (
    <header>
      <nav className="flex p-4 justify-evenly items-center">
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>RESUMIFIED</Link>
        </h1>

        <ul className="flex gap-8 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-gray-400 transition-all duration-200"
            >
              Home
            </Link>
          </li>
          <button onClick={handleProtectedNavigation}>
            <li>
              <Link
                to="/create-resume"
                className="hover:text-gray-400 transition-all duration-200"
              >
                Create Resume
              </Link>
            </li>
          </button>
          <button onClick={handleProtectedNavigation}></button>
          <li>
            <Link
              to="/feedback"
              className="hover:text-gray-400 transition-all duration-200"
            >
              Feedback
            </Link>
          </li>
          <button onClick={handleProtectedNavigation}>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-gray-400 transition-all duration-200"
              >
                Dashboard
              </Link>
            </li>
          </button>
        </ul>

        <div className="flex gap-8">
          {user ? (
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => signOut(auth)}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button className="bg-[linear-gradient(99.89deg,#4C40F7_0%,#FF00A1_106.22%)]">
                <Link to="/signup">SignUp</Link>
              </Button>
              <Button className="bg-white text-black hover:text-white">
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
