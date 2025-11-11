import React from "react";

function Card({ id, nickname, profileUrl, contents, font, bgColor, onClick }) {
  const rotation = Math.random() * 20 - 5;
  const offsetX = Math.random() * 8 - 4;
  const offsetY = Math.random() * 6 - 3;
  console.log("🧾 카드 내용:", contents);

  const CHARACTER_LIMIT = 55;
  const truncatedContents =
    contents.length > CHARACTER_LIMIT
      ? contents.substring(0, CHARACTER_LIMIT) + "..."
      : contents;
  const cardClasses = `
    w-[130px] h-[130px] flex flex-col justify-between items-start p-3 cursor-pointer rounded-lg shadow-md 
    ${bgColor || "bg-white"} 
  `;
  return (
    <div
      key={id}
      className={cardClasses}
      style={{
        transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {profileUrl && (
          <img src={profileUrl} alt="작성자" className="w-6 h-6 rounded-full" />
        )}
        <span className="text-[13px] text-gray-800 truncate font-sans">
          {nickname}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full text-center">
        <span
          className={`text-[13px] text-gray-800 leading-snug select-none whitespace-pre-wrap break-keep ${
            font || "font-sans"
          }`}
        >
          {truncatedContents}
        </span>
      </div>
    </div>
  );
}

export default Card;
