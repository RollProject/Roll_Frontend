import CardList from "@/components/commons/card/CardList";

const DUMMY_PAPERS = [
  { id: 1, title: "코르티스 신곡 발매 축하해", theme: "bg-white" },
  { id: 2, title: "새해 다짐하기", theme: "bg-white" },
  { id: 3, title: "침착맨 생일 축하해", theme: "bg-white" },
  { id: 4, title: "침착맨 생일 축하해", theme: "bg-white" },
  { id: 5, title: "침착맨 생일 축하해", theme: "bg-white" },
  { id: 6, title: "침착맨 생일 축하해", theme: "bg-white" },
  { id: 7, title: "침착맨 생일 축하해", theme: "bg-white" },
  { id: 8, title: "침착맨 생일 축하해", theme: "bg-white" },
];

function TestGrindItem() {
  // 메인 화면에서 6개의 항목만 미리보기
  const mainPreview = DUMMY_PAPERS.slice(0, 6);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        인기 롤링페이퍼{" "}
        <span className="text-sm text-blue-500 cursor-pointer ml-2">
          더보기
        </span>
      </h2>

      {/*  그리드 컨테이너를 중앙 정렬합니다.  */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3  w-full">
          {mainPreview.map((paper) => (
            <CardList
              key={paper.id}
              title={paper.title}
              themeStyle={paper.theme}
              isFullView={false} // 메인 화면에서는 제목만 표시
              onClick={() => console.log(`제목: ${paper.title} 클릭됨`)}
            />
          ))}
        </div>
      </div>

      {/* ... 내 롤링페이퍼 섹션 및 우체통 이미지 ... */}
    </div>
  );
}

export default TestGrindItem;
