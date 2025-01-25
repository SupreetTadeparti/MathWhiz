import { React, useState } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import CoverButton from "../components/CoverButton";

const Home: React.FC = () => {
  const [videoPath, setVideoPath] = useState(null);

  return (
    <>
      <Navbar />
      <Background />
      <div className="flex flex-col justify-center items-center gap-20 w-full h-full ">
        <div className="flex flex-col gap-10 p-20 bg-black/40 rounded-md border border-gray-100">
          <input
            className="w-80 text-white text-center text-lg py-1 px-2 border-b-2 border-white focus:outline-none"
            type="text"
            placeholder="What would you like to understand?"
          />
          <CoverButton content="Generate Visual Explanation" />
        </div>

        {videoPath && <video width="640" height="320" controls autoPlay>
          <source src="animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>}
      </div>
    </>
  );
};

export default Home;
