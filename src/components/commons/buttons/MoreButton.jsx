import React from "react";

function MoreButton({ label = "더보기", onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[12px] font-semibold text-[#646363] hover:text-gray-900 transition"
    >
      {label}
    </button>
  );
}

export default MoreButton;
