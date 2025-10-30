import React, { useEffect, useState } from "react"; // ⭐️ React와 useState import
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
// ❌ import cards from "@/mock/cards/Card"; // Mock 데이터 제거
import { getBoard } from "@/api/board/getBoard";

function BoardPage() {
  // ⭐️ 1. API 응답 데이터를 저장할 상태(State) 선언
  const [pageTitle, setPageTitle] = useState("로딩 중..."); // ⭐️ 보드 제목 (board.RB_title)
  const [cardsData, setCardsData] = useState([]); // ⭐️ 카드 목록 (papers)

  const myRollingPapers = [];

  // ❌ const pageTitle = cards && ... (상태 변수로 대체되므로 제거)

  useEffect(() => {
    async function fetchBoard() {
      // ⭐️ API 호출 (ID는 1000007로 고정)
      const result = await getBoard(1000007);

      // ⭐️ 2. 데이터가 성공적으로 왔는지 확인
      if (result && result.board && Array.isArray(result.papers)) {
        console.log("🎯 프론트에서 받은 board:", result.board);
        console.log("🧾 연결된 papers:", result.papers);

        // ⭐️ 3. 보드 제목(RB_title)을 pageTitle 상태에 저장
        setPageTitle(result.board.RB_title);

        // ⭐️ 4. 'papers' 배열을 CardList가 사용하기 좋은 형태로 가공 (매핑)
        // (CardList나 모달이 title, text를 사용한다고 가정)
        const mappedCards = result.papers.map((paper) => ({
          id: paper.RP_id, // key prop 용도
          title: paper.RU_nickname, // ⭐️ 작성자 닉네임 (콘솔로그에는 생략되었지만, 백엔드 코드에 있음)
          text: paper.RP_contents, // ⭐️ 페이퍼 내용
          // --- CardList가 스타일링을 위해 사용할 수 있는 추가 정보 ---
          bgColor: paper.RP_bgcolor,
          font: paper.RP_font,
          profileUrl: paper.RU_profile_url, // ⭐️ 프로필 이미지 (백엔드 코드에 있음)
          datetime: paper.RP_datetime,
        }));

        // ⭐️ 5. 가공된 카드 목록을 cardsData 상태에 저장
        setCardsData(mappedCards);
      } else {
        // API 호출은 성공했으나 데이터가 없는 경우
        console.warn("API에서 보드나 페이퍼 데이터를 받지 못했습니다.", result);
        setPageTitle("보드를 찾을 수 없습니다.");
      }
    }

    fetchBoard();
  }, []); // 빈 배열: 처음 마운트될 때 1회만 실행

  return (
    <div>
      {/* ⭐️ 6. Header의 title에 pageTitle 상태 변수 사용 */}
      <Header title={pageTitle} leftContent="back" rightContent="아이콘" />

      <div>
        {/* ⭐️ 7. CardList의 cards prop에 mock 데이터(cards) 대신 cardsData 상태 변수 사용 */}
        <CardList cards={cardsData} />
      </div>

      {/* --- (하단 '내 롤링페이퍼' 섹션은 그대로 유지) --- */}
      <section className="flex flex-col gap-[70px] px-[25px] py-[25px]">
        <div className="flex flex-col gap-[30px]"></div>

        <div className="flex flex-col gap-[30px]">
          {myRollingPapers.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg h-[120px] flex items-center justify-center">
                내용
              </div>

              <div className="bg-gray-100 rounded-lg h-[120px] flex items-center justify-center">
                내용
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full py-8">
              <img
                src={noCardImage}
                alt="빈 롤링페이퍼 이미지"
                className="w-[193px] h-[193px] opacity-80"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BoardPage;
