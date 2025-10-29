import React from "react";

function Chip({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-[14px] py-[3px] text-[12px] text-white bg-black rounded-full
                 hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
    >
      {label}
    </button>
  );
}

export default Chip;
