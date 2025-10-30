import React from "react";

function Card({ id, nickname, profileUrl, contents, font, bgImage }) {
  const rotation = Math.random() * 10 - 5;
  const offsetX = Math.random() * 8 - 4;
  const offsetY = Math.random() * 6 - 3;
  console.log("🧾 카드 내용:", contents);

  return (
    <div
      key={id}
      className={"w-[140px] h-[150px] bg-cover bg-center flex flex-col justify-between items-start p-3"}
      style={{
        transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
        backgroundImage: `url(${bgImage})`,
        fontFamily: font,
      }}
    >
      <div className="flex items-center gap-2">
        {profileUrl && (
          <img
            src={profileUrl}
            alt="작성자"
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="text-[13px] text-gray-800 truncate">
          {nickname}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full text-center">
        <span
          className="text-[13px] text-gray-800 leading-snug select-none whitespace-pre-wrap"
          style={{ fontFamily: font }}
        >
          {contents}
        </span>
      </div>
    </div>
  );
}

export default Card;
