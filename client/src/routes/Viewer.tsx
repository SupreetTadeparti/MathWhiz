import React, { useEffect, useState } from "react";
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
    let [questionData, setQuestionData] = useState([]);
    const videoUrl = location.state?.videoUrl;
    const prompt = location.state?.prompt || "Multiplication";

    useEffect(() => {
        fetch("http://localhost:5000/generate_questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
            }),
        })
            .then(async (res) => {
                console.log(res);
                console.log(await res.json());
            })
            .catch((err) => console.error("Error saving video:", err));
        if (!isAuthenticated) {
            // navigate("/");
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
        <>
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
                <Questions questionData={questionData} />
            </div>
        </>
    );
};

export default Viewer;
