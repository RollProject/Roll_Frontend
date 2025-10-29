import React from "react";
import { useNavigate } from "react-router-dom";

function PopularCard({ id, text, image }) {
  const navigate = useNavigate();

  const rotation = Math.random() * 10 - 5;
  const offsetX = Math.random() * 8 - 4;
  const offsetY = Math.random() * 6 - 3;

  const formattedText = text
    ? text.split(/ {2,}/).map((part, index) => (<React.Fragment key={index}> {part}{index < text.split(/ {2,}/).length - 1 && <br />}</React.Fragment>))
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
      className="w-[125px] h-[135px] bg-cover bg-center flex items-center justify-center text-center cursor-pointer transition-transform hover:scale-[1.03]"
      style={{
        transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
        backgroundImage: `url(${image})`,
        zIndex: typeof id === "number" ? id : 0,
      }}
    >
      <span className="text-black text-[13px] p-3 leading-tight select-none">
        {formattedText}
      </span>
    </div>
  );
}

export default PopularCard;
