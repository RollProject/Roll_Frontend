import React from "react";
import Card from "@/components/commons/card/Card";

import memo1 from "@/assets/memo1.svg";
import memo2 from "@/assets/memo2.svg";
import memo3 from "@/assets/memo3.svg";
import memo4 from "@/assets/memo4.svg";
import memo5 from "@/assets/memo5.svg";
import memo6 from "@/assets/memo6.svg";

function CardList({ cards, onCardClick }) {
  const memoBackgrounds = [memo1, memo2, memo3, memo4, memo5, memo6];

  return (
    <div className="flex flex-wrap justify-center w-full mt-1">
      {cards.map((card, i) => {
        const memoBg = memoBackgrounds[i % memoBackgrounds.length];

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
              bgImage={memoBg}
              onClick={() => onCardClick?.(card)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardList;
