import React from "react";
import PopularCard from "./PopularCard";

function PopularCardList({ cards}) {

  return (
    <div className="flex flex-wrap justify-center w-full mt-8">
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

export default PopularCardList;
