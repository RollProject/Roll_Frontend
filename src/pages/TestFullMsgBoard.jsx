import React from "react";
import CardList from "@/components/commons/card/CardList";

// 테스트용 메시지 데이터 (실제 데이터는 백엔드 API에서 가져와야 함)
const DUMMY_MESSAGES = [
  {
    id: 101,
    title: "작성자 A",
    content: "팀장님...",
    theme: "bg-yellow-100",
    font: "font-serif",
  },
  {
    id: 102,
    title: "작성자 B",
    content: "새해 복...",
    theme: "bg-blue-100",
    font: "font-mono",
  },
  {
    id: 103,
    title: "작성자 C",
    content: "이거는 내용이...",
    theme: "bg-green-100",
    font: "font-sans",
  },
];

function TestFullMsgBoard() {
  const paperTitle = "팀 회식 기념 롤링페이퍼";

  return (
    <div className="p-4 pt-16 min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold mb-4 text-center">
        {paperTitle} - 상세 메시지 목록
      </h1>

      {/*  그리드 레이아웃: 가로 3개, 세로 제한 없음  */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {DUMMY_MESSAGES.map((message) => (
          <CardList
            key={message.id}
            title={message.title}
            content={message.content}
            fontStyle={message.font}
            themeStyle={message.theme}
            isFullView={true} // 상세 메시지 뷰 활성화
            onClick={() => console.log(`${message.title}의 메시지 상세 클릭`)}
          />
        ))}
      </div>
      {/* 무한 스크롤 테스트를 위한 여백 */}
      <div className="h-48"></div>
    </div>
  );
}

export default TestFullMsgBoard;
