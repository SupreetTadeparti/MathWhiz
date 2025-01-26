import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutBtn: React.FC = () => {
  const { logout } = useAuth0();
  return (
    <div
      onClick={() => logout()}
      className="text-white text-lg border-[var(--primary)] rounded-sm border-2 px-6 py-1 cursor-pointer bg-transparent hover:bg-[var(--primary)] transition-colors duration-300"
    >
      Logout
    </div>
  );
};

export default LogoutBtn;
