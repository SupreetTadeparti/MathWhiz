import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      fetchVideos();
    }
  }, [isAuthenticated]);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*');

    if (error) {
      console.error('Error fetching videos:', error);
    } else {
      setVideos(data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container flex flex-col justify-center items-center gap-10 w-full h-full">
        <h1 className="text-white font-bold text-5xl text-center">
          The Vault
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-800 p-4 rounded-lg">
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-white font-bold text-xl mt-2">{video.title}</h2>
              <p className="text-gray-400">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Vault;