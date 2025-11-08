import React from "react";
import { useNavigate } from "react-router-dom";

function PopularCard({ id, text, image, participants }) {
  const navigate = useNavigate();

  // 기존 랜덤 회전 효과 유지
  const rotation = Math.random() * 10 - 5;
  const offsetX = Math.random() * 8 - 4;
  const offsetY = Math.random() * 6 - 3;

  const formattedText = text
    ? text.split(/ {2,}/).map((part, index) => (
        <React.Fragment key={index}>
          {part} {index < text.split(/ {2,}/).length - 1 && <br />}
        </React.Fragment>
      ))
    : null;

  const handleClick = () => {
    if (typeof id === "number") {
      navigate(`/board/${id}`);
    }
  };

  return (
    <div
      key={id}
      onClick={handleClick}
      className="relative w-[165px] h-[175px] bg-cover bg-center flex items-center justify-center text-center cursor-pointer transition-transform hover:scale-[1.03]"
      style={{
        transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
        backgroundImage: `url(${image})`,
      }}
    >
      {/* 제목 */}
      <span className="text-black text-[13px] p-3 leading-tight select-none">
        {formattedText}
      </span>

      {/* 👥 참여자 수 배지 (오른쪽 하단 고정) */}
      {participants > 0 && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-3 py-[2px] rounded-full select-none shadow-sm mb-4 mr-2">
          {participants}명 참여
        </div>
      )}
    </div>
  );
}

export default PopularCard;
