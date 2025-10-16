// src/components/commons/card/CardList.jsx

import React from "react";
import Card from "@/components/commons/card/Card";

/**
 * 롤링페이퍼 항목 목록을 그리드 레이아웃으로 표시하는 컨테이너입니다.
 *
 * @param {Array<object>} props.papers - 표시할 롤링페이퍼 데이터 배열
 * @param {boolean} [props.isFullView=false] - 상세 메시지 뷰 여부
 * @param {string}
 */
function CardList({
  papers,
  isFullView = false,
  className = "",
  gapClass = "",
}) {
  // isFullView에 따라 렌더링할 목록 길이 결정
  const displayPapers = isFullView ? papers : papers.slice(0, 6);
  const gridLayoutClass = `grid grid-cols-3 ${gapClass} ${className}`;

  return (
    // 수정: 올바른 템플릿 리터럴 문법 (백틱 ``) 사용
    // Grid 레이아웃을 외부 className으로 받고, 나머지 클래스 제거
    <div className={gridLayoutClass}>
      {displayPapers.map(
        (
          paper //  2. 각 Card에 음수 마진을 적용하여 강제로 겹치게 합니다.
        ) => (
          <div key={paper.id} className=" w-[320px] h-[120px]">
            <Card
              title={paper.title}
              content={paper.content}
              fontStyle={paper.font}
              isFullView={isFullView} // Card 컴포넌트는 w-full h-full이므로, 부모 div의 크기를 채웁니다.
            />
          </div>
        )
      )}
    </div>
  );
}

export default CardList;
