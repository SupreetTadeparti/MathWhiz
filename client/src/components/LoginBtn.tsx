import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div 
    onClick={() => loginWithRedirect()}
    className="text-white text-lg border-white rounded-sm border-2 px-6 py-1 cursor-pointer bg-transparent hover:bg-white hover:text-gray-800 transition-colors duration-300">
      Login
    </div>
  );
};

export default LoginBtn;
