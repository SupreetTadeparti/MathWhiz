import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { logout } = useAuth0();

  return (
    <div className="fixed w-full h-20 flex justify-center items-center gap-10 px-10">
      <img className="mr-auto h-8" src="/img/logo.svg" alt="Mathwhiz.biz" />

      <div className="h-8 flex flex-col justify-between cursor-pointer" onClick={toggleMenu}>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
      {menuOpen && (
        <div className="absolute top-20 right-10 bg-[var(--secondary)] shadow-lg rounded-lg border-2 border-yellow-500">
          <ul className="flex flex-col p-2">
            <li className="py-4 px-6 text-white text-xl text-center rounded-sm cursor-pointer bg-transparent hover:bg-[var(--primary)] transition-colors duration-300">Option 1</li>
            <li className="py-4 px-6 text-white text-xl text-center rounded-sm cursor-pointer bg-transparent hover:bg-[var(--primary)] transition-colors duration-300">Option 2</li>
            <li
              onClick={() => logout()}
              className="py-4 px-6 text-white text-xl rounded-sm cursor-pointer bg-transparent hover:bg-[var(--primary)] transition-colors duration-300"
            >Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;