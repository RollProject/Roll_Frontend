import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Components
import Header from "@/components/commons/bar/NavHeader";
import noCardImage from "@/assets/no-card-image.svg";
import CardList from "@/components/commons/card/CardList";
import MemoModal from "@/components/commons/modal/MemoModal";
import FloatingButtons from "@/components/commons/buttons/FloatingButtons";
import DecorateModal from "@/components/commons/buttons/DecorateModal";

// API & Store
import { getBoard } from "@/api/board/getBoard";
import { createPaper } from "@/api/paper/createPaper";
import { deleteBoard } from "@/api/board/deleteBoard";
import { useUserStore } from "@/stores/userStore";

function BoardPage() {
  // -------------------------------------------------------
  // 1. 상태 변수 선언 (State Definition)
  // -------------------------------------------------------
  const [pageTitle, setPageTitle] = useState("로딩 중...");
  const [pageBgColor, setPageBgColor] = useState("bg-gray-100");
  const [cardsData, setCardsData] = useState([]);

  // 스티커 관련 상태
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);

  // 모달 관련 상태
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isDecorateModalOpen, setIsDecorateModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    fullContent: "",
    profileUrl: "",
    font: "font-sans",
    fontColor: "text-black",
    textAlign: "text-left",
  });

  const { boardId } = useParams();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  // -------------------------------------------------------
  // 2. 사용자 세션 확인 (User Session)
  // -------------------------------------------------------
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("https://roll-backend.onrender.com/me", {
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
          console.warn("세션 만료:", data.message);
          navigate("/auth");
        }
      } catch (error) {
        console.error("❌ 세션 오류:", error);
        navigate("/auth");
      }
    };

    fetchUserInfo();
  }, [setUser, navigate]);

  // -------------------------------------------------------
  // 3. 보드 및 페이퍼 데이터 불러오기 (Fetch Board Data)
  // -------------------------------------------------------
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
      console.warn("API 데이터 수신 실패", result);
      setPageTitle("보드를 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  // -------------------------------------------------------
  // 4. 스티커 관련 로직 (Sticker Logic)
  // -------------------------------------------------------

  // 스티커 불러오기
  const fetchStickers = async () => {
    try {
      const res = await fetch(
        `https://roll-backend.onrender.com/board/${boardId}/stickers`,
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

  // 카드가 로드된 후 약간의 딜레이를 주고 스티커 위치 계산 (DOM 렌더링 대기)
  useEffect(() => {
    const timer = setTimeout(fetchStickers, 50);
    return () => clearTimeout(timer);
  }, [cardsData]);

  // 스티커 DB 저장
  const saveStickerToDB = async (sticker) => {
    try {
      await fetch(
        `https://roll-backend.onrender.com/board/${boardId}/sticker`,
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
    } catch (error) {
      console.error("스티커 저장 오류:", error);
    }
  };

  // 보드 클릭 시 스티커 부착
  const handleBoardClick = (e) => {
    if (!selectedSticker) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left - 25; // 스티커 중심 보정
    const rawY = e.clientY - rect.top - 25;

    // 0~255 좌표계로 변환
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
    setSelectedSticker(null); // 부착 후 선택 해제
  };

  // -------------------------------------------------------
  // 5. 핸들러 함수들 (Handlers: Write, Delete, Click)
  // -------------------------------------------------------

  // 페이퍼 작성 완료 핸들러
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
      const result = await createPaper({
        boardId: boardId,
        kakao_id: user.kakao_id,
        content: data.content,
        font: data.font,
        color: data.color,
        align: data.align,
        textColor: data.textColor,
      });

      if (result.success) {
        await fetchBoard();
      } else {
        alert(result.message || "페이퍼 작성에 실패했습니다.");
      }
    } catch (err) {
      alert(`오류 발생: ${err.message}`);
    }
  };

  // 보드 삭제 핸들러
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

  // 카드 클릭 (메모 모달 열기)
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

  // -------------------------------------------------------
  // 6. 렌더링 (Render)
  // -------------------------------------------------------
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
      <Header
        title={pageTitle}
        leftContent="back"
        rightContent="아이콘"
        onRightClick={handleDeleteBoard}
      />

      {/* 카드 리스트 영역 */}
      <div className="relative z-10 px-[5px]">
        {cardsData.length > 0 ? (
          <CardList cards={cardsData} onCardClick={handleCardClick} />
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

      {/* 스티커 레이어 (클릭 통과, 이미지는 클릭 막음) */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {stickers.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt="sticker"
            className="absolute w-[85px] h-[85px] pointer-events-auto select-none"
            style={{ top: s.y, left: s.x }}
            onClick={(e) => e.stopPropagation()} // 스티커 클릭 시 보드 클릭 이벤트 전파 방지
            draggable={false}
          />
        ))}
      </div>

      {/* 메모 상세 보기 모달 */}
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

      {/* 플로팅 버튼 (글쓰기 & 꾸미기) */}
      <FloatingButtons
        mode={2}
        onWriteComplete={handleWriteComplete}
        onDecorateClick={() => setIsDecorateModalOpen(true)}
      />

      {/* 스티커 선택 모달 */}
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
