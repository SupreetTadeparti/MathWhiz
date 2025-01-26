import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) navigate("/");

const videos = [
    { id: 1, title: "Video 1", description: "This is the first video", thumbnail: "https://cdn11.bigcommerce.com/s-nq6l4syi/images/stencil/1280x1280/products/31870/2006535/70252-1024__27730.1721175215.jpg?c=2" },
    { id: 2, title: "Video 2", description: "This is the second video", thumbnail: "https://cdn11.bigcommerce.com/s-nq6l4syi/images/stencil/1280x1280/products/31870/2006535/70252-1024__27730.1721175215.jpg?c=2" },
    { id: 3, title: "Video 3", description: "This is the third video", thumbnail: "https://cdn11.bigcommerce.com/s-nq6l4syi/images/stencil/1280x1280/products/31870/2006535/70252-1024__27730.1721175215.jpg?c=2" },
];

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