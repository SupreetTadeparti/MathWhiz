import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Questions from "../components/Questions";

interface ViewerProps {
  setMonochrome: (value: boolean) => void;
  setProgress: (value: boolean) => void;
}

const quiz_data = {
  quiz: [
    {
      question:
        "What is the length of the hypotenuse of a right triangle with legs of 3 and 4 units?",
      options: { a: "5 units", b: "6 units", c: "7 units", d: "8 units" },
      answer: "a",
    },
    {
      question: "Which of the following is the Pythagorean triple?",
      options: { a: "2, 3, 5", b: "3, 4, 5", c: "5, 12, 14", d: "8, 15, 18" },
      answer: "b",
    },
    {
      question: "The Pythagorean theorem applies to which type of triangle?",
      options: {
        a: "Equilateral triangle",
        b: "Isosceles triangle",
        c: "Scalene triangle",
        d: "Right triangle",
      },
      answer: "d",
    },
  ],
};

const Viewer: React.FC<ViewerProps> = ({ setMonochrome, setProgress }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const videoUrl = location.state?.videoUrl;

  useEffect(() => {
    if (!isAuthenticated) {
      //   navigate("/");
      return;
    }

    if (!videoUrl) {
      console.error("No video URL provided");
      navigate("/generator");
      return;
    }

    setProgress(false);
  }, [isAuthenticated, videoUrl, navigate, setMonochrome, setProgress]);

  setMonochrome(true);

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-10 w-full min-h-[100vh]">
        {videoUrl ? (
          <video
            className="w-3/4 max-w-4xl"
            controls
            autoPlay
            src={videoUrl}
            onError={(e) => {
              console.error("Video loading error:", e);
              setProgress(false);
            }}
          />
        ) : (
          <div className="text-white text-2xl">
            Loading video... If nothing appears, please try again.
          </div>
        )}
      </div>
      <div className="w-full min-h-[100vh]">
        <Questions questionData={quiz_data.quiz} />
      </div>
    </div>
  );
};

export default Viewer;
