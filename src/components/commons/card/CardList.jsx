import React from "react";
import PopularCard from "./Card";

function CardList({ cards }) {
  return (
    <div className="flex flex-wrap justify-center w-full mt-1">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`relative ${i % 3 !== 0 ? "-ml-2" : "ml-0"}
          }`}
        >
          <PopularCard {...card} />
        </div>
      ))}
    </div>
  );
}

export default CardList;
