import React, { useEffect, useState } from "react";
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
import MemoModal from "@/components/commons/modal/MemoModal";
import { getBoard } from "@/api/board/getBoard";
import { useParams } from "react-router-dom";

function BoardPage() {
  const [pageTitle, setPageTitle] = useState("로딩 중...");
  const [cardsData, setCardsData] = useState([]);
  const { boardId } = useParams();
  console.log(boardId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    fullContent: "",
    profileUrl: "",
  });

  useEffect(() => {
    async function fetchBoard() {
      const result = await getBoard(boardId);

      if (result && result.board && Array.isArray(result.papers)) {
        console.log("🎯 프론트에서 받은 board:", result.board);
        console.log("🧾 연결된 papers:", result.papers);

        setPageTitle(result.board.RB_title);
        const mappedCards = result.papers.map((paper) => ({
          id: paper.RP_id,
          title: paper.RU_nickname,
          text: paper.RP_contents,
          image: paper.RU_profile_url,
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
  }, [boardId]);

  const handleCardClick = (cardData) => {
    setModalContent({
      title: cardData.title,
      fullContent: cardData.text,
      profileUrl: cardData.profileUrl,
    });
    setIsModalOpen(true);
  };

  return (
    <div className={`${pageBgColor} min-h-screen`}>
      <Header title={pageTitle} leftContent="back" rightContent="아이콘" />
      <div>
        {cardsData.length > 0 ? (
          // 1. 메모지가 1개 이상 있으면 CardList 표시
          <CardList cards={cardsData} onCardClick={handleCardClick} />
        ) : (
          // 2. 메모지가 없으면 (0개면) "빈 이미지" 표시
          <div className="flex justify-center items-center w-full h-full py-8 pt-20">
            <img
              src={noCardImage}
              alt="빈 롤링페이퍼 이미지"
              className="w-[193px] h-[193px] opacity-80"
            />
          </div>
        )}
      </div>

      <MemoModal
        title={modalContent.title}
        fullContent={modalContent.fullContent}
        profileUrl={modalContent.profileUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default BoardPage;
