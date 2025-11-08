import React from "react";

function SectionHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* 왼쪽: 타이틀 */}
      <h2 className="text-[20px]  text-white">{title}</h2>

      {/* 오른쪽: children (MoreButton, Chip 등) */}
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

export default SectionHeader;
