import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Questions from "../components/Questions";

interface ViewerProps {
  setMonochrome: (value: boolean) => void;
  setProgress: (value: boolean) => void;
}

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

    setMonochrome(true);
    setProgress(false);
  }, [isAuthenticated, videoUrl, navigate, setMonochrome, setProgress]);

  return (
    <div className="width-full h-full flex flex-col overflow-y-auto">
      <Navbar />
      <div className="container flex flex-col justify-center items-center gap-10 w-full min-h-[100vh]">
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
      <div className="w-full min-h-[100vh] bg-red">
        <Questions questionData={{}} />
      </ div>
    </div>
  );
};

export default Viewer;
