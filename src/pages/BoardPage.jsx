import React, { useEffect, useState } from "react";
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
import MemoModal from "@/components/commons/modal/MemoModal";
import FloatingButtons from "@/components/commons/buttons/FloatingButtons";
import DecorateModal from "@/components/commons/buttons/DecorateModal";

import { getBoard } from "@/api/board/getBoard";
import { createPaper } from "@/api/paper/createPaper";
import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

function BoardPage() {
  const [pageTitle, setPageTitle] = useState("로딩 중...");
  const [cardsData, setCardsData] = useState([]);
  const [pageBgColor, setPageBgColor] = useState("bg-gray-100");
  const [stickers, setStickers] = useState([]);

  const { boardId } = useParams();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState({
    title: "",
    fullContent: "",
    profileUrl: "",
    font: "font-sans",
  });

  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isDecorateModalOpen, setIsDecorateModalOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          setUser({
            id: data.data.RU_id ?? data.data.kakao_id,
            nickname: data.data.nickname,
            profile_image: data.data.profile_image,
            kakao_id: data.data.kakao_id,
            RU_id: data.data.RU_id,
          });
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("❌ 세션 오류:", error);
        navigate("/auth");
      }
    };

    fetchUserInfo();
  }, [setUser, navigate]);

  const fetchBoard = async () => {
    const result = await getBoard(boardId);
    if (result && result.board) {
      setPageTitle(result.board.RB_title);
      setPageBgColor(result.board.RB_bgcolor);

      const mapped = result.papers.map((paper) => ({
        id: paper.RP_id,
        title: paper.RU_nickname,
        text: paper.RP_contents,
        image: paper.RU_profile_url,
        bgColor: paper.RP_bgcolor,
        font: paper.RP_font,
        profileUrl: paper.RU_profile_url,
      }));

      setCardsData(mapped);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchStickers = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/board/${boardId}/stickers`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (data.success) {
        const boardElement = document.querySelector(".board-wrapper");
        if (!boardElement) return;

        const w = boardElement.offsetWidth;
        const h = boardElement.offsetHeight;

        const mapped = data.stickers.map((s) => ({
          src: s.PS_Type,
          x: (s.PS_X / 255) * w,
          y: (s.PS_Y / 255) * h,
        }));

        setStickers(mapped);
      }
    } catch (error) {
      console.error("❌ 스티커 로딩 오류:", error);
    }
  };

  useEffect(() => {
    setTimeout(fetchStickers, 50);
  }, [cardsData]);

  const saveStickerToDB = async (sticker) => {
    try {
      const res = await fetch(
        `http://localhost:3000/board/${boardId}/sticker`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            RU_id: user.RU_id,
            PS_Type: sticker.src,
            PS_X: sticker.scaledX,
            PS_Y: sticker.scaledY,
          }),
        }
      );
      console.log("스티커 저장 결과:", await res.json());
    } catch (error) {
      console.error("스티커 저장 오류:", error);
    }
  };

  const handleBoardClick = (e) => {
    if (!selectedSticker) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left - 25;
    const rawY = e.clientY - rect.top - 25;

    const scaledX = Math.min(255, Math.max(0, (rawX / rect.width) * 255));
    const scaledY = Math.min(255, Math.max(0, (rawY / rect.height) * 255));

    const newSticker = {
      src: selectedSticker,
      x: rawX,
      y: rawY,
      scaledX: Math.round(scaledX),
      scaledY: Math.round(scaledY),
    };

    setStickers((prev) => [...prev, newSticker]);
    saveStickerToDB(newSticker);
    setSelectedSticker(null);
  };

  const openMemoModal = (card) => {
    setModalContent({
      title: card.title,
      fullContent: card.text,
      profileUrl: card.profileUrl,
      font: card.font,
    });
    setIsMemoModalOpen(true);
  };


  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        세션 확인 중…
      </div>
    );

  return (
    <div
      className={`${pageBgColor} min-h-screen relative board-wrapper`}
      onClick={handleBoardClick}
    >
      <Header title={pageTitle} leftContent="back" rightContent="아이콘" />

      <div className="relative z-10 px-[5px]">
        {cardsData.length > 0 ? (
          <CardList cards={cardsData} onCardClick={openMemoModal} />
        ) : (
          <div className="flex justify-center items-center py-20">
            <img
              src={noCardImage}
              alt="empty"
              className="w-[193px] opacity-80"
            />
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-50 pointer-events-none">
        {stickers.map((s, i) => (
          <img
            key={i}
            src={s.src}
            className="absolute w-[85px] h-[85px] pointer-events-auto select-none"
            style={{ top: s.y, left: s.x }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        ))}
      </div>

      <MemoModal
        {...modalContent}
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        boardTitle={pageTitle}
      />

      <FloatingButtons
        mode={2}
        onWriteComplete={async (data) => {
          const result = await createPaper({
            boardId,
            kakao_id: user.kakao_id,
            content: data.content,
            font: data.font,
            color: data.color,
            align: data.align,
          });
          if (result.success) fetchBoard();
        }}
        onDecorateClick={() => setIsDecorateModalOpen(true)}
      />

      {isDecorateModalOpen && (
        <DecorateModal
          onClose={() => setIsDecorateModalOpen(false)}
          onSelect={(src) => setSelectedSticker(src)} 
        />
      )}
    </div>
  );
}

export default BoardPage;
