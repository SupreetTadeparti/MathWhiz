import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CoverButton from "../components/CoverButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

interface HomeProps {
  setMonochrome: (value: boolean) => void;
  setProgress: (value: boolean) => void;
}

const Generator: React.FC<HomeProps> = ({ setMonochrome, setProgress }) => {
  let [hidden, setHidden] = useState(false);
  let [prompt, setPrompt] = useState("");

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
          className="max-w-[80%] w-100 mb-10 text-white text-center text-lg py-1 px-2 border-b-2 border-white focus:outline-none"
          type="text"
          placeholder="Enter prompt here..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <CoverButton
          onClick={() => {
            // Generate Visual Explanation
            axios
              .post("http://localhost:8000/generate_animation_openai", {
                prompt: prompt,
              })
              .then((res) => {
                console.log(res);
              });

            // Generate Questions
            axios
              .post("http://localhost:8000/generate_questions_openai", {
                prompt: prompt,
              })
              .then((res) => {
                console.log(res);
              });

            setProgress(true);
            setHidden(true);
          }}
          content="Generate Visual Explanation"
        />
      </div>
    </>
  );
};

export default Generator;
