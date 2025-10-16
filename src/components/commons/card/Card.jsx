// src/components/commons/card/Card.jsx (최종 통합)

import React, { useMemo } from "react";

/**
 * 롤링페이퍼 메시지 카드 컴포넌트입니다. (GridItem의 로직을 통합)
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.title - 롤링페이퍼의 제목
 * @param {string} [props.content] - 상세 뷰에서 표시할 메시지 내용 (있으면 상세 모드)
 * @param {string} [props.fontStyle] - 적용할 글꼴 스타일
 * @param {function} [props.onClick] - 항목 클릭 이벤트 핸들러
 * @param {boolean} [props.isFullView=false] - 상세 뷰 활성화 여부
 */
const MAX_PREVIEW_LENGTH = 75;
const ROTATION_RANGE = 5; // -1, 0, 1도

function Card({
  title,
  content,
  fontStyle = "font-sans",
  isFullView = false,
  onClick,
  ...rest
}) {
  //  1. 랜덤 각도 계산 (모든 카드는 독립적으로 회전)
  const rotationDegree = useMemo(() => {
    return Math.floor(Math.random() * ROTATION_RANGE) - 1;
  }, []);

  //  2. 내용 및 정렬 분기
  // content가 있고 isFullView가 true이면 상세 내용 (상단 정렬)
  const showFullContent = isFullView && content;
  const textSource = showFullContent ? content : title;

  const textToDisplay =
    showFullContent && textSource.length > MAX_PREVIEW_LENGTH
      ? textSource.slice(0, MAX_PREVIEW_LENGTH) + "..."
      : textSource;

  // 3. 정렬 스타일 결정
  const textAlignmentStyle = showFullContent
    ? { display: "block", textAlign: "left" } // 상세 내용: 상단 정렬
    : { display: "flex", alignItems: "center", justifyContent: "center" }; // 제목: 중앙 정렬

  // 4. 스타일 정의 (isFullView에 따라 높이 및 줄 제한 달라짐)
  const baseStyle =
    "w-[100px]  h-[100px] rounded-xl transition-all duration-300 relative overflow-hidden";
  // 5. 텍스트 줄 제한 (제목 미리보기는 2줄로 고정)
  const textLineClamp = showFullContent ? "" : "line-clamp-2";

  // 6. 메인 미리보기 (isFullView=false) 렌더링
  return (
    <div
      className={`${baseStyle} bg-transparent`}
      onClick={onClick}
      {...rest}
      style={{
        backgroundImage: "url('/memo.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: showFullContent ? "cover" : "100% 100%", // 상세 뷰는 cover, 미리보기는 100%
        backgroundPosition: "center",
        transform: `rotate(${rotationDegree}deg)`,
      }}
    >
      <p
        className={`text-gray-800 break-words absolute inset-0 p-4 ${fontStyle} ${textLineClamp}`}
        style={{
          whiteSpace: "pre-wrap",
          ...textAlignmentStyle,
          fontSize: showFullContent ? "0.875rem" : "1rem", // 상세는 작게(sm), 제목은 크게(base)
        }}
      >
        {textToDisplay}
      </p>
    </div>
  );
}

export default Card;
