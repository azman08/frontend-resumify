import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.js";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
