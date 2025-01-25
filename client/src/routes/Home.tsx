import React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container flex flex-col justify-center items-center gap-10 w-full h-full bg-gray-800">
        <video width="640" height="320" controls autoPlay>
          <source src="animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <input
          className="w-80  text-white text-center text-lg py-1 px-2 border-b-2 border-white focus:outline-none"
          type="text"
          placeholder="What would you like to understand?"
        />
        <button className="w-80 text-lg shadow-md shadow-gray-500 bg-gradient-to-r from-cyan-500 to-pink-300 text-white py-3 px-5 rounded-sm cursor-pointer transform transition-transform duration-300 hover:scale-105">
          Generate Visual Explanation
        </button>
      </div>
    </>
  );
};

export default Home;
