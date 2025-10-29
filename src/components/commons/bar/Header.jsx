import React from "react";
import logo from "@/assets/logo.png";
import hamberger from "@/assets/hamberger.jpg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 left-0 w-full flex justify-between items-center px-[15px] py-5 bg-white/40 backdrop-blur-md z-50">
      <img
        src={logo}
        alt="logo"
        onClick={() => navigate("/")}
        className="w-[60px] object-contain cursor-pointer"
      />

      <img
        src={hamberger}
        alt="menu"
        className="w-[20px] h-[20px] cursor-pointer"
        onClick={() => console.log("햄버거 클릭")}
      />
    </header>
  );
}

export default Header;
