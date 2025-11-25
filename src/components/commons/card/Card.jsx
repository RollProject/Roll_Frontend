import React from "react";

function Card({
  id,
  nickname,
  profileUrl,
  contents,
  font,
  bgColor,
  fontColor,
  textAlign,
  onClick,
}) {
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

  let flexAlignClass;
  switch (textAlign) {
    case "left":
      flexAlignClass = "justify-start";
      break;
    case "right":
      flexAlignClass = "justify-end";
      break;
    case "center":
    default:
      flexAlignClass = "justify-center";
  }
  const textAlignClass = `text-${textAlign || "center"}`;
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

      <div className={`flex-1 flex items-center w-full ${flexAlignClass}`}>
        <span
          className={`text-[13px] leading-snug select-none whitespace-pre-wrap break-keep 
                      ${font || "font-sans"} 
                      ${fontColor || "text-gray-800"} 
                      ${textAlignClass}`}
        >
          {truncatedContents}
        </span>
      </div>
    </div>
  );
}

export default Card;
