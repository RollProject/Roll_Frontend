import React from "react";
import Card from "@/components/commons/card/Card";

function CardList({ cards, onCardClick }) {
  return (
    <div className="flex flex-wrap w-full mt-1 justify-center">
      {cards.map((card, i) => {
        return (
          <div
            key={card.id}
            className={`relative ${i % 3 !== 0 ? "-ml-2" : "ml-0"}`}
          >
            <Card
              id={card.id}
              nickname={card.title}
              contents={card.text}
              bgColor={card.bgColor}
              profileUrl={card.profileUrl}
              font={card.font}
              fontColor={card.fontColor}
              textAlign={card.textAlign}
              onClick={() => onCardClick?.(card)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardList;
