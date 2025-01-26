import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { logout } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setMenuOpen(false);
  };

  return (
    <div className="fixed w-full h-20 flex justify-between items-center gap-10 px-10">
      <img className="mr-auto h-8" src="/img/logo.svg" alt="Mathwhiz.biz" />

      <div
        className="h-8 flex flex-col justify-between cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
      <div
        className={`absolute top-5 right-5 bg-[var(--secondary)] shadow-lg rounded-lg border-2 border-yellow-500 transition-opacity duration-50 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul className="flex flex-col p-2 text-center">
          <li onClick={() => navigate("/generator")}
            className="py-4 px-6 text-white text-xl text-center rounded-sm cursor-pointer bg-transparent hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-300">
            Generator
          </li>
          <li onClick={() => navigate("/vault")}
            className="py-4 px-6 text-white text-xl text-center rounded-sm cursor-pointer bg-transparent hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-300">
            The Vault
          </li>
          <li
            onClick={() => logout()}
            className="py-4 px-6 text-white text-xl rounded-sm cursor-pointer bg-transparent hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-300"
          >
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;