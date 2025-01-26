import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CoverButton from "../components/CoverButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface HomeProps {
  setMonochrome: (value: boolean) => void;
  setProgress: (value: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ setMonochrome, setProgress }) => {
  let [hidden, setHidden] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) navigate("/");

  setMonochrome(true);

  return (
    <>
      <Navbar />
      <div
        className={`${
          hidden ? "hidden" : ""
        } container flex flex-col justify-center items-center gap-10 w-full h-full`}
      >
        <h1 className="text-white font-bold text-5xl text-center">
          What would you like to understand?
        </h1>
        <input
          className="w-100  text-white text-center text-lg py-1 px-2 border-b-2 border-white focus:outline-none"
          type="text"
          placeholder="Enter prompt here..."
        />
        <CoverButton
          onClick={() => {
            setProgress(true);
            setHidden(true);
          }}
          content="Generate Visual Explanation"
        />
      </div>
    </>
  );
};

export default Home;
