import React from "react";
import Navbar from "./Navbar.jsx";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col justify-center items-center text-center gap-6 ">
        <h1 className="text-5xl font-bold mt-[180px] tracking-wide ">
          Build Your Resume in Minutes!
        </h1>
        <h3 className="text-md font-normal text-gray-400 ">
          🚀 Let AI Build Your Perfect Resume – Fast, Smart, and Hassle-Free
        </h3>
        <Button className="bg-white text-gray-700 relative mt-8 px-10 py-6 text-md font-bold  rounded-lg tracking-wide transition-all duration-200 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00F5A0] before:to-[#00D9F5] before:rounded-lg before:-z-10 hover:scale-110 hover:text-black">
          <Link to={"/login"}>GET STARTED</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
