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
  const [selectedSticker, setSelectedSticker] = useState(null); // ✅ 어떤 스티커 선택했는지 저장
  const [stickers, setStickers] = useState([]);

  // ✅ 세션 확인
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
      } catch (err) {
        console.error("❌ 세션 확인 오류:", err);
        navigate("/auth");
      }
    };
    fetchUserInfo();
  }, [setUser, navigate]);

  // ✅ 보드 데이터 가져오기
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
      }));
      setCardsData(mappedCards);
    } else {
      setPageTitle("보드를 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  // ✅ 작성 완료 핸들러
  const handleWriteComplete = async (data) => {
    if (!user?.RU_id) {
      alert("사용자 정보를 찾을 수 없습니다.");
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
      });

      if (result.success) {
        alert("페이퍼 작성 완료!");
        await fetchBoard();
      } else {
        alert(result.message || "페이퍼 작성 실패");
      }
    } catch (err) {
      alert(`오류 발생: ${err.message}`);
    }
  };

  // ✅ 카드 클릭 → 메모 모달
  const handleCardClick = (cardData) => {
    setModalContent({
      title: cardData.title,
      fullContent: cardData.text,
      profileUrl: cardData.profileUrl,
      font: cardData.font,
    });
    setIsMemoModalOpen(true);
  };

  // ✅ 스티커 선택 시 (DecorateModal → 선택 완료)
  const handleStickerSelect = (src) => {
    console.log("✅ 선택된 스티커:", src);
    setSelectedSticker(src); // 선택만 저장
    setIsDecorateModalOpen(false); // 모달 닫기
  };

  // ✅ 보드 클릭 시 선택된 스티커를 클릭 위치에 추가
  const handleBoardClick = (e) => {
    if (!selectedSticker) return; // 선택된 스티커 없으면 무시

    // 클릭한 위치 계산
    const boardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boardRect.left - 25; // 이미지 중앙 정렬용
    const y = e.clientY - boardRect.top - 25;

    setStickers((prev) => [...prev, { src: selectedSticker, x, y }]);
    setSelectedSticker(null); // 한 번 붙이면 해제
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        세션 확인 중...
      </div>
    );

  return (
    <div
      className={`${pageBgColor} min-h-screen relative`}
      onClick={handleBoardClick} // ✅ 클릭한 위치 감지
    >
      <Header title={pageTitle} leftContent="back" rightContent="아이콘" />

      {/* 📝 카드 목록 */}
      <div className="relative z-10 px-[5px]">
        {cardsData.length > 0 ? (
          <CardList cards={cardsData} onCardClick={handleCardClick} />
        ) : (
          <div className="flex justify-center items-center w-full h-full py-8 pt-20">
            <img
              src={noCardImage}
              alt="빈 롤링페이퍼"
              className="w-[193px] h-[193px] opacity-80"
            />
          </div>
        )}
      </div>

      {/* 🎀 스티커 전용 레이어 */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker.src}
            alt={`sticker-${index}`}
            className="absolute w-[85px] h-[85px] select-none cursor-grab pointer-events-auto"
            style={{ top: sticker.y, left: sticker.x }}
            draggable={false}
            onClick={(e) => e.stopPropagation()} // 카드 클릭 방지
          />
        ))}
      </div>

      {/* 📄 메모 모달 */}
      <MemoModal
        title={modalContent.title}
        fullContent={modalContent.fullContent}
        profileUrl={modalContent.profileUrl}
        font={modalContent.font}
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        boardTitle={pageTitle}
      />

      {/* 🪄 플로팅 버튼 */}
      <FloatingButtons
        mode={2}
        onWriteComplete={handleWriteComplete}
        onDecorateClick={() => setIsDecorateModalOpen(true)}
      />

      {/* 🎨 스티커 모달 */}
      {isDecorateModalOpen && (
        <DecorateModal
          onClose={() => setIsDecorateModalOpen(false)}
          onSelect={handleStickerSelect}
        />
      )}
    </div>
  );
}

export default BoardPage;
