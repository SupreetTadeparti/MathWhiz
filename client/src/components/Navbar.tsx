import React from "react";
import LoginBtn from "./LoginBtn";

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full h-20 flex justify-end items-center gap-10 px-10">
      <div className="mr-auto text-3xl text-white font-bold">Mathwhiz.biz</div>
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
