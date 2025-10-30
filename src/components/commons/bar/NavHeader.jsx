import React from "react";
import { useNavigate } from "react-router-dom";

import back from "@/assets/LeftArrow.svg";
import hamberger from "@/assets/hamberger-black.svg";

function NavHeader({ title, onBackClick }) {
  const navigate = useNavigate();

  const handleBack = onBackClick || (() => navigate(-1));
  return (
    <header className="sticky top-0 left-0 w-full flex justify-between items-center px-6 py-5 bg-white/40 backdrop-blur-md z-50">
      <img
        src={back}
        alt="back"
        onClick={handleBack}
        className="w-[25px] h-[25px] object-contain cursor-pointer"
      />
      <h1 className="flex-1 text-center text-lg truncate px-4">
        {title}
      </h1>

      <img
        src={hamberger}
        alt="menu"
        className="w-[20px] h-[20px] cursor-pointer"
        onClick={() => console.log("햄버거 클릭")}
      />
    </header>
  );
}
export default NavHeader;
