import React from "react";
import LoginBtn from "./LoginBtn";

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full h-20 bg-red-400 flex justify-end">
      <div className="logo">Omegagen</div>
      <LoginBtn />
      <div className="h-8 flex flex-col justify-between cursor-pointer">
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
    </div>
  );
};

export default Navbar;
