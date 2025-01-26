import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface Video {
  id: number;
  prompt: string;
  thumbnail: string;
  video: string;
  created_at: string;
}

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [videos, setVideos] = useState<Video[]>([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      fetchVideos();
    }
  }, [isAuthenticated, user]);

  const fetchVideos = async () => {
    if (!user?.sub) return;
    //setLoading(true);
    try {
      const response = await fetch(`http://api.mathwhiz.biz:5000/get_user_videos/${user.sub}`);
      const data = await response.json();
      if (data.videos) {
        setVideos(data.videos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      //setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-10 w-full h-full">
        <h1 className="text-white font-bold text-5xl text-center">The Vault</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-white font-bold text-xl mt-2">
                {video.prompt}
              </h2>
              <p className="text-gray-400">Created: {new Date(video.created_at).toLocaleDateString()}</p>
              <a
                href={video.video}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 mt-2 block"
              >
                View Video
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Vault;
