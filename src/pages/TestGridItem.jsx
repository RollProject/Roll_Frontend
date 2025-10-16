// src/pages/TestGridItem.jsx

import React from "react";
import CardList from "@/components/commons/card/CardList";

// 테스트용 메시지 데이터 (제목 미리보기 용)
const DUMMY_MESSAGES_PREVIEW = [
  {
    id: 1,
    title: "🎉 생일 축하 메시지입니다!",
    content: "상세 내용 1",
    font: "font-serif",
    theme: "bg-yellow-100",
  },
  {
    id: 2,
    title: "새로운 시작을 응원하며...",
    content: "상세 내용 2",
    font: "font-mono",
    theme: "bg-blue-100",
  },
  {
    id: 3,
    title: "오랜만에 전하는 안부",
    content: "상세 내용 3",
    font: "font-sans",
    theme: "bg-green-100",
  },
  {
    id: 4,
    title: "팀 프로젝트 완료 기념!",
    content: "상세 내용 4",
    font: "font-pink",
    theme: "bg-pink-100",
  },
  {
    id: 5,
    title: "가족에게 보내는 사랑의 편지",
    content: "상세 내용 5",
    font: "font-serif",
    theme: "bg-purple-100",
  },
  {
    id: 6,
    title: "오늘의 일기 (간단)",
    content: "상세 내용 6",
    font: "font-sans",
    theme: "bg-yellow-100",
  },
  // 7번째 항목은 isFullView=false일 때 표시되지 않습니다.
  {
    id: 7,
    title: "숨겨진 메시지입니다.",
    content: "상세 내용 7",
    font: "font-mono",
    theme: "bg-blue-100",
  },
];

/**
 * 메인 페이지에서 롤링페이퍼 목록을 미리보기로 보여주는 테스트 화면입니다.
 * CardList의 isFullView=false 모드를 테스트합니다.
 */
function TestGridItem() {
  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-2xl mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        메인 페이지 - 롤링페이퍼 목록 미리보기 (3x2)
      </h1>

      <div className="border border-gray-300 p-4 rounded-lg">
        {/* ⭐️ CardList 렌더링 (isFullView=false) ⭐️ */}
        <CardList
          papers={DUMMY_MESSAGES_PREVIEW}
          isFullView={false}
          className="w-full" // ⭐️ CardList 컨테이너의 너비만 설정 ⭐️
        />
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        * 7번째 항목은 'isFullView=false' 설정에 의해 출력되지 않습니다.
      </p>
    </div>
  );
}

export default TestGridItem;
