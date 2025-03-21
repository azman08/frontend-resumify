import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created Successfully! 🚀");
      navigate("/dashboard"); // Redirect after signup
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-white">
      <div className="border-2 p-[100px] rounded-xl">
        <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <Label className="font-bold text-lg ">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 bg-transparent border border-gray-600 rounded-md"
          />
          <Label className="font-bold text-lg ">Email</Label>
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 bg-transparent border border-gray-600 rounded-md"
          />
          <Label className="font-bold text-lg ">Password</Label>

          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 bg-transparent border border-gray-600 rounded-md"
          />
          <p className="text-sm font-normal mt-2 text-gray-400">
            Already have an Account?{" "}
            <span className=" text-blue-500">
              {" "}
              <Link to={"login"}>Login</Link>
            </span>
          </p>
          <Button
            type="submit"
            className="px-6 py-3 mt-4 rounded-lg font-bold hover:bg-white hover:text-black"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
