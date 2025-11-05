import React, { useEffect, useState } from "react";
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
import MemoModal from "@/components/commons/modal/MemoModal";
import FloatingMenu from "@/components/commons/buttons/FloatingButton";
import PageModal from "@/components/commons/modal/PageModal";
import WriteButton from "@/components/commons/buttons/WriteButton";

import { getBoard } from "@/api/board/getBoard";
import { useParams } from "react-router-dom";

const MENU_OPTIONS = [
  { label: "메세지 작성하기", action: "create" },
  { label: "페이지 공유하기", action: "share" },
];
function BoardPage() {
  const [pageTitle, setPageTitle] = useState("로딩 중...");
  const [cardsData, setCardsData] = useState([]);
  const [pageBgColor, setPageBgColor] = useState("bg-gray-100");
  const { boardId } = useParams();
  console.log(boardId);
  const [modalContent, setModalContent] = useState({
    title: "",
    fullContent: "",
    profileUrl: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleWriteButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSelect = (action) => {
    setIsMenuOpen(false);

    if (action === "create") {
      setIsCreateModalOpen(true);
    } else if (action === "share") {
      alert("페이지 공유 기능 구현 예정");
    }
  };

  const handleModalComplete = async (data) => {
    console.log("모달에서 받은 데이터:", data);

    // --- 향후 API 연동 시

    alert("페이퍼 작성 API 연동 필요");
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    async function fetchBoard() {
      const result = await getBoard(boardId);

      if (result && result.board && Array.isArray(result.papers)) {
        console.log("🎯 프론트에서 받은 board:", result.board);
        console.log("🧾 연결된 papers:", result.papers);

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
    }

    fetchBoard();
  }, [boardId]);

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
      <div>
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

      <MemoModal
        title={modalContent.title}
        fullContent={modalContent.fullContent}
        profileUrl={modalContent.profileUrl}
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
      />

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <FloatingMenu
            options={MENU_OPTIONS}
            onSelect={handleMenuSelect}
            className="z-51"
          />
        </>
      )}

      {!isMenuOpen && !isMemoModalOpen && !isCreateModalOpen && (
        <WriteButton onClick={handleWriteButtonClick} />
      )}

      <PageModal
        isOpen={isCreateModalOpen}
        title="롤링페이퍼 작성하기"
        onClose={() => setIsCreateModalOpen(false)}
        onComplete={handleModalComplete}
      />
    </div>
  );
}

export default BoardPage;
