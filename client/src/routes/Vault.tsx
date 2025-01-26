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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      fetchVideos();
    }
  }, [isAuthenticated, user]);

  const fetchVideos = async () => {
    if (!user?.sub) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/get_user_videos/${user.sub}`);
      const data = await response.json();
      if (data.videos) {
        setVideos(data.videos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white font-bold text-5xl text-center mb-12 mt-20">
          Your Video Vault
        </h1>

        {loading ? (
          <div className="text-center text-white text-xl ">Loading your videos...</div>
        ) : videos.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            No videos yet. Try generating some!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-slate-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="p-6">
                  <h2 className="text-white font-bold text-xl mb-4 line-clamp-2">
                    {video.prompt}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm">
                      Created: {new Date(video.created_at).toLocaleDateString()}
                    </p>
                    <a
                      href={video.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Vault;
