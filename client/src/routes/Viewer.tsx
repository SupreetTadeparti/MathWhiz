import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
            return;
        }

        if (!videoUrl) {
            console.error('No video URL provided');
            navigate('/generator');
            return;
        }

        setMonochrome(false);
        setProgress(false);
    }, [isAuthenticated, videoUrl, navigate, setMonochrome, setProgress]);

    return (
        <>
            <Navbar />
            <div className="container flex flex-col justify-center items-center gap-10 w-full h-full">
                {videoUrl ? (
                    <video
                        className="w-3/4 max-w-4xl"
                        controls
                        autoPlay
                        src={videoUrl}
                        onError={(e) => {
                            console.error('Video loading error:', e);
                            setProgress(false);
                        }}
                    />
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
