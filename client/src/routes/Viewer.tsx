import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";

interface ViewerProps {
    setMonochrome: (value: boolean) => void;
    setProgress: (value: boolean) => void;
}

const Viewer: React.FC<ViewerProps> = ({ setMonochrome, setProgress }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const videoUrl = location.state?.videoUrl;
    const prompt = location.state?.prompt;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
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

    const handleQuizClick = () => {
        if (prompt) {
            navigate("/quiz", { state: { prompt } });
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center gap-10 w-full min-h-screen">
                {videoUrl ? (
                    <>
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
                        <button
                            onClick={handleQuizClick}
                            className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                            Take Quiz
                        </button>
                    </>
                ) : (
                    <div className="text-white text-2xl">
                        Loading video... If nothing appears, please try again.
                    </div>
                )}
            </div>
        </>
    );
};

export default Viewer;
