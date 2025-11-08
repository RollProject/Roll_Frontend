import React from "react";
import PopularCard from "@/components/commons/card/PopularCard";

function PopularCardList({ cards = [] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 w-full mt-4">
      {cards.map((card) => (
        <PopularCard key={card.id} {...card} />
      ))}
    </div>
  );
}

export default PopularCardList;
