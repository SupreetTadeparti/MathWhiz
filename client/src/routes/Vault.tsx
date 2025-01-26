import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) navigate("/");

  return (
    <>
      <Navbar />
      <div className="container flex flex-col justify-center items-center gap-10 w-full h-full">
        <h1 className="text-white font-bold text-5xl text-center">
          The Vault
        </h1>
      </div>
    </>
  );
};

export default Vault;