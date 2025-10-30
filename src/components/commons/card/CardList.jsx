import React from "react";
import PopularCard from "@/components/commons/card/Card";

function CardList({ cards, onCardClick }) {
  return (
    <div className="flex flex-wrap justify-center w-full mt-1">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`relative ${i % 3 !== 0 ? "-ml-2" : "ml-0"}
          }`}
        >
          <PopularCard {...card} onClick={() => onCardClick(card)} />
        </div>
      ))}
    </div>
  );
}

export default CardList;
