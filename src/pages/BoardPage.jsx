import React, { useEffect, useState } from "react";
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
import MemoModal from "@/components/commons/modal/MemoModal";
import FloatingButtons from "@/components/commons/buttons/FloatingButtons"; // ✅ 새로 만든 플로팅 버튼 import

import { getBoard } from "@/api/board/getBoard";
import { useParams, useNavigate } from "react-router-dom";

import { createPaper } from "@/api/paper/createPaper";
import { useUserStore } from "@/stores/userStore";
import { deleteBoard } from "@/api/board/deleteBoard";
function BoardPage() {
  const [pageTitle, setPageTitle] = useState("로딩 중...");
  const [cardsData, setCardsData] = useState([]);
  const [pageBgColor, setPageBgColor] = useState("bg-gray-100");
  const { boardId } = useParams();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState({
    title: "",
    fullContent: "",
    profileUrl: "",
    font: "font-sans",
    fontColor: "text-black",
    textAlign: "text-left",
  });

  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        const data = await res.json();
        console.log("🧠 /me 응답 (BoardPage):", data);

        if (data.success) {
          setUser({
            id: data.data.RU_id ?? data.data.kakao_id,
            nickname: data.data.nickname,
            profile_image: data.data.profile_image,
            kakao_id: data.data.kakao_id,
            RU_id: data.data.RU_id,
          });
        } else {
          console.warn("세션 만료 (BoardPage):", data.message);
          navigate("/auth");
        }
      } catch (err) {
        console.error("❌ 세션 확인 중 오류 (BoardPage):", err);
        navigate("/auth");
      }
    };

    fetchUserInfo();
  }, [setUser, navigate]);

  const fetchBoard = async () => {
    if (!boardId) return;

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
        fontColor: paper.RP_fontColor,
        textAlign: paper.RP_TextAlign,
      }));
      setCardsData(mappedCards);
    } else {
      console.warn("API에서 보드나 페이퍼 데이터를 받지 못했습니다.", result);
      setPageTitle("보드를 찾을 수 없습니다.");
    }
  };

  const handleWriteComplete = async (data) => {
    if (!user?.RU_id) {
      alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
      return;
    }
    if (!boardId) {
      alert("보드 ID를 찾을 수 없습니다.");
      return;
    }

    try {
      const paperData = {
        boardId: boardId,
        kakao_id: user.kakao_id,
        content: data.content,
        font: data.font,
        color: data.color,
        align: data.align,
        textColor: data.textColor,
      };

      const result = await createPaper(paperData);

      if (result.success) {
        alert("페이퍼가 성공적으로 작성되었습니다!");
        await fetchBoard();
      } else {
        alert(result.message || "페이퍼 작성에 실패했습니다.");
      }
    } catch (err) {
      alert(`오류 발생: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const handleCardClick = (cardData) => {
    setModalContent({
      title: cardData.title,
      fullContent: cardData.text,
      profileUrl: cardData.profileUrl,
      font: cardData.font,
      fontColor: cardData.fontColor,
      textAlign: cardData.textAlign,
    });
    setIsMemoModalOpen(true);
  };
  const handleDeleteBoard = async () => {
    const isConfirmed = window.confirm(
      "정말로 이 보드를 삭제하시겠습니까?\n모든 롤링페이퍼가 영구히 삭제됩니다."
    );

    if (isConfirmed) {
      try {
        const result = await deleteBoard(boardId);

        if (result.success) {
          alert(result.message);
          navigate("/");
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        세션 확인 중...
      </div>
    );
  }
  return (
    <div className={`${pageBgColor} min-h-screen`}>
      <Header
        title={pageTitle}
        leftContent="back"
        rightContent="아이콘"
        onRightClick={handleDeleteBoard}
      />

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
        font={modalContent.font}
        fontColor={modalContent.fontColor}
        textAlign={modalContent.textAlign}
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        boardTitle={pageTitle}
      />

      {/* 🪄 플로팅 버튼 (WriteModal 포함) */}
      <FloatingButtons mode={2} onWriteComplete={handleWriteComplete} />
    </div>
  );
}

export default BoardPage;
