import React from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Background />
      <div className="container flex flex-col justify-center items-center gap-10 w-full h-full ">
        <video width="640" height="320" controls autoPlay>
          <source src="animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <input
          className="w-80  text-white text-center text-lg py-1 px-2 border-b-2 border-white focus:outline-none"
          type="text"
          placeholder="What would you like to understand?"
        />
        <button className="generate-btn w-80 text-lg text-white py-3 px-5 cursor-pointer border-amber-600 border-3">
          Generate Visual Explanation
        </button>
      </div>
    </>
  );
};

export default Home;
