import React from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "@/assets/logo.png"; 

function Header() {
  const navigate = useNavigate(); 

  const handleLogoClick = () => {
    navigate("/"); 
  };

  return (
    <header className="sticky top-0 left-0 w-full flex justify-between items-center px-[15px] py-5 bg-black backdrop-blur-md z-50">
      <img
        src={logo}
        alt="ROLL 로고"
        className="h-[25px] w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleLogoClick} 
      />
      <p className=""></p>
    </header>
  );
}

export default Header;
