import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful! 🚀");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen  text-white">
        <div className="border-2 p-[100px] rounded-xl">
          <h2 className="text-3xl font-bold text-center pb-12">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Label className="font-bold text-lg ">Email</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 bg-transparent border border-gray-600 rounded-md"
            />
            <Label className="font-bold text-lg pt-4">Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 bg-transparent border border-gray-600 rounded-md"
            />
            <p className="text-sm font-normal mt-2 text-gray-400">
              Dont't have an Account?{" "}
              <span className=" text-blue-500">
                {" "}
                <Link to={"/signup"}>SignUp</Link>
              </span>
            </p>
            <Button
              type="submit"
              className="px-6 py-3 mt-4 rounded-lg font-bold hover:bg-white hover:text-black"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
