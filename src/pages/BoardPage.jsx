import React, { useEffect, useState } from "react"; 
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
import { getBoard } from "@/api/board/getBoard";

function BoardPage() {
  const [pageTitle, setPageTitle] = useState("로딩 중..."); 
  const [cardsData, setCardsData] = useState([]); 

  const myRollingPapers = [];


  useEffect(() => {
    async function fetchBoard() {
      const result = await getBoard(1000021);

      if (result && result.board && Array.isArray(result.papers)) {
        console.log("🎯 프론트에서 받은 board:", result.board);
        console.log("🧾 연결된 papers:", result.papers);

        setPageTitle(result.board.RB_title);

        const mappedCards = result.papers.map((paper) => ({
          id: paper.RP_id, 
          title: paper.RU_nickname, 
          text: paper.RP_contents, 
          bgColor: paper.RP_bgcolor,
          font: paper.RP_font,
          profileUrl: paper.RU_profile_url, 
        }));

        setCardsData(mappedCards);
      } else {
        console.warn("API에서 보드나 페이퍼 데이터를 받지 못했습니다.", result);
        setPageTitle("보드를 찾을 수 없습니다.");
      }
    }

    fetchBoard();
  }, []); 

  return (
    <div>
      <Header title={pageTitle} leftContent="back" rightContent="아이콘" />
      <div>
        <CardList cards={cardsData} />
      </div>
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
