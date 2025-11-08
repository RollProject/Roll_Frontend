import React, { useEffect, useState } from "react";
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
import MemoModal from "@/components/commons/modal/MemoModal";
import FloatingButtons from "@/components/commons/buttons/FloatingButtons"; // ✅ 새로 만든 플로팅 버튼 import

import { getBoard } from "@/api/board/getBoard";
import { useParams } from "react-router-dom";

function BoardPage() {
  const [pageTitle, setPageTitle] = useState("로딩 중...");
  const [cardsData, setCardsData] = useState([]);
  const [pageBgColor, setPageBgColor] = useState("bg-gray-100");
  const { boardId } = useParams();

  const [modalContent, setModalContent] = useState({
    title: "",
    fullContent: "",
    profileUrl: "",
  });

  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);

  const fetchBoard = async () => {
    const result = await getBoard(boardId);

    if (result && result.board && Array.isArray(result.papers)) {
      setPageTitle(result.board.RB_title);
      setPageBgColor(result.board.RB_bgcolor);
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
  };

  const handleWriteComplete = async (data) => {
    console.log("✅ WriteModal 최종 데이터 수신:", data);
    alert(
      `작성 완료: 내용=${data.content.substring(0, 10)}... | 색=${data.color}`
    );
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  // --- 카드 클릭 시 메모 모달 오픈
  const handleCardClick = (cardData) => {
    setModalContent({
      title: cardData.title,
      fullContent: cardData.text,
      profileUrl: cardData.profileUrl,
    });
    setIsMemoModalOpen(true);
  };

  return (
    <div className={`${pageBgColor} min-h-screen`}>
      <Header title={pageTitle} leftContent="back" rightContent="아이콘" />

      <div className="px-[5px]">
        {cardsData.length > 0 ? (
          <CardList cards={cardsData} onCardClick={handleCardClick} />
        ) : (
          <div className="flex justify-center items-center w-full h-full py-8 pt-20">
            <img
              src={noCardImage}
              alt="빈 롤링페이퍼 이미지"
              className="w-[193px] h-[193px] opacity-80"
            />
          </div>
        )}
      </div>

      {/* 📝 메모 모달 */}
      <MemoModal
        title={modalContent.title}
        fullContent={modalContent.fullContent}
        profileUrl={modalContent.profileUrl}
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
      />

      {/* 🪄 플로팅 버튼 (WriteModal 포함) */}
      <FloatingButtons mode={2} onWriteComplete={handleWriteComplete} />
    </div>
  );
}

export default BoardPage;
