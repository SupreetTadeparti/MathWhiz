import React from "react";
import LogoutBtn from "./LogoutBtn";

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full h-20 flex justify-end items-center gap-10 px-10">
      <img className="mr-auto h-8" src="/img/logo.svg" alt="Mathwhiz.biz" />

      <LogoutBtn />
      <div className="h-8 flex flex-col justify-between cursor-pointer">
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
    </div>
  );
};

export default Navbar;
