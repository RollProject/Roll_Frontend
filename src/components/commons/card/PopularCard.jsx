import React from "react";

function PopularCard({ id, text, image }) {
  const rotation = Math.random() * 10 - 5;
  const offsetX = Math.random() * 8 - 4;
  const offsetY = Math.random() * 6 - 3;

  const formattedText = text.split(/ {2,}/).map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < text.split(/ {2,}/).length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div
      key={id}
      className="w-[125px] h-[135px] bg-cover bg-center flex items-center justify-center text-center"
      style={{
        transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
        backgroundImage: `url(${image})`,
        zIndex: id,
      }}
    >
      <span className="text-black text-[13px] p-3 leading-tight">
        {formattedText}
      </span>
    </div>
  );
}

export default PopularCard;
