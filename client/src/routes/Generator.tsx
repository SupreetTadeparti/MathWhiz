import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CoverButton from "../components/CoverButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface HomeProps {
  setMonochrome: (value: boolean) => void;
  setProgress: (value: boolean) => void;
}

const Generator: React.FC<HomeProps> = ({ setMonochrome, setProgress }) => {
  let [hidden, setHidden] = useState(false);
  let [prompt, setPrompt] = useState("");

  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    setMonochrome(true);
  }, [isAuthenticated, navigate, setMonochrome]);

  const handleSubmit = async () => {
    setProgress(true);
    setHidden(true);

    try {
      const response = await fetch(
        `http://api.mathwhiz.biz:5000/generate_animation_openai?prompt=${encodeURIComponent(
          prompt
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data && data.video_path) {
        const videoUrl = `http://api.mathwhiz.biz:5000/video${data.video_path}`;

        // Fire and forget the save request
        fetch("http://api.mathwhiz.biz:5000/save_video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
            video: videoUrl,
            thumbnail: videoUrl,
            user_id: user?.sub,
          }),
        }).catch((err) => console.error("Error saving video:", err));

        // Navigate immediately without waiting for save
        navigate("/viewer", {
          state: { videoUrl, prompt },
        });
      } else {
        throw new Error("No video path received from API");
      }
    } catch (error) {
      console.error("Error:", error);
      setProgress(false);
      setHidden(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`${
          hidden ? "hidden" : ""
        } flex flex-col justify-center items-center gap-10 w-full h-full`}
      >
        <h1 className="text-white font-bold text-5xl text-center">
          What would you like to understand?
        </h1>
        <input
          className="max-w-[80%] w-100 mb-10 text-white text-center text-lg py-1 px-2 border-b-2 border-white focus:outline-none"
          type="text"
          placeholder="Enter prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <CoverButton
          onClick={handleSubmit}
          content="Generate Visual Explanation"
        />
      </div>
    </>
  );
};

export default Generator;
