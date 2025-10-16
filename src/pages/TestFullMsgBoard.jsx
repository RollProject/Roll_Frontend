import React from "react";
import CardList from "@/components/commons/card/CardList";
import Header from "@/components/commons/bar/Header";

// 테스트용 메시지 데이터 (실제 데이터는 백엔드 API에서 가져와야 함)
const DUMMY_MESSAGES = [
  {
    id: 1,
    title: "🎉 생일 축하 메시지입니다!",
    content: "🎉 생일 축하 메시지입니다!",
    font: "font-serif",
    theme: "bg-yellow-100",
  },
  {
    id: 2,
    title: "새해 다짐하기",
    content: "새해 복 많이 받고, 2026년 대박나세요! (이 메시지는 짧은 경우)",
    font: "font-mono",
    theme: "bg-yellow-100",
  },
  {
    id: 3,
    title: "침착맨 생일 축하해",
    content:
      "이거는 내용이 좀 길어서 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.",
    font: "font-sans",
    theme: "bg-green-100",
  },
  {
    id: 4,
    title: "랜덤 테스트 메시지",
    content:
      "두 번째 줄입니다.\n줄 바꿈(pre-wrap)이 잘 되는지 테스트하는 메시지입니다. 성공적으로 작동해야 합니다.",
    font: "font-serif",
    theme: "bg-pink-100",
  },
  {
    id: 5,
    title: "중앙 정렬 테스트",
    content: "내용이 짧을 때 중앙 정렬 테스트 메시지",
    font: "font-mono",
    theme: "bg-purple-100",
  },
  {
    id: 6,
    title: "마지막 항목",
    content: "마지막 항목이 그리드에 잘 배치되는지 확인합니다.",
    font: "font-sans",
    theme: "bg-yellow-100",
  },
];

function TestFullMsgBoard() {
  const paperTitle = "팀 회식 기념 롤링페이퍼";

  const MainHeader = () => (
    <Header
      title={paperTitle}
      leftContent={<span className="text-xl">&lt;</span>} // 뒤로가기 아이콘
      rightContent={<span className="text-xl">⋮⋮</span>} // 메뉴 아이콘
      className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm" // 상단 고정
    />
  );

  return (
    // 전체 컨테이너는 relative, min-h-screen을 사용하여 전체 높이 보장
    <div className=" min-h-screen bg-gray-50 pb-10">
      <MainHeader />

      {/* 2. 중앙 내용 컨테이너 */}
      <div className="max-w-xl mx-auto p-4 pt-16">
        <h1 className="text-xl font-bold mb-4 text-center">
          {paperTitle} - 상세 메시지 목록
        </h1>

        <div className="flex justify-center">
          {/*  이 div에 높이가 지정되지 않아 Grid 컨테이너가 높이를 잃을 수 있습니다.  */}
          <div className="grid grid-cols-3 gap-x-2 gap-y-4 max-w-7xl mx-auto">
            {/*  CardList가 이 div의 역할을 수행하도록 코드를 단순화합니다. */}

            <CardList
              papers={DUMMY_MESSAGES}
              isFullView={true}
              className="justify-center"
            />
          </div>
        </div>
        {/* 무한 스크롤 테스트를 위한 여백 */}
        <div className="h-48"></div>
      </div>
    </div>
  );
}

export default TestFullMsgBoard;
