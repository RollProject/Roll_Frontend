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
import { deletePaper } from "@/api/paper/deletePaper";

const BACKEND_URL = "https://roll-backend.onrender.com";

function BoardPage() {
  const [pageTitle, setPageTitle] = useState("로딩 중...");
  const [pageBgColor, setPageBgColor] = useState("bg-gray-100");
  const [cardsData, setCardsData] = useState([]);

  // 스티커 상태
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);

  // 모달 상태
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isDecorateModalOpen, setIsDecorateModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState({
    id: null,
    title: "",
    fullContent: "",
    profileUrl: "",
    font: "font-sans",
    fontColor: "text-black",
    textAlign: "text-left",
    bgColor: "bg-white",
    bgImage: null,
    isMine: false,
  });

  const { boardId } = useParams();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  // -------------------------------------------------------
  // 1. 사용자 세션 확인
  // -------------------------------------------------------
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log("🟦 /me 요청");
        const res = await fetch(`${BACKEND_URL}/me`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log("🟨 /me 응답:", data);

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
        navigate("/auth");
      }
    };

    fetchUserInfo();
  }, [setUser, navigate]);

  // -------------------------------------------------------
  // 2. 보드 데이터 불러오기
  // -------------------------------------------------------
  const fetchBoard = async () => {
    console.log("🟦 보드 조회 요청:", boardId);
    if (!boardId) return;

    const result = await getBoard(boardId);
    console.log("🟨 getBoard 응답:", result);

    if (result?.board && Array.isArray(result.papers)) {
      setPageTitle(result.board.RB_title);
      setPageBgColor(result.board.RB_bgcolor);

      const mapped = result.papers.map((p) => ({
        id: p.RP_id,
        title: p.RU_nickname,
        text: p.RP_contents,
        image: p.RU_profile_url,
        bgImage: p.RP_bgImage,
        bgColor: p.RP_bgcolor,
        font: p.RP_font,
        profileUrl: p.RU_profile_url,
        fontColor: p.RP_fontColor,
        textAlign: p.RP_TextAlign,
        authorId: p.RP_RU_id ?? p.RU_id,
      }));

      console.log("🟩 매핑된 카드:", mapped);
      setCardsData(mapped);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  // -------------------------------------------------------
  // 3. 스티커 불러오기
  // -------------------------------------------------------
  const fetchStickers = async () => {
    try {
      console.log(
        "🟦 스티커 조회:",
        `${BACKEND_URL}/board/${boardId}/stickers`
      );
      const res = await fetch(`${BACKEND_URL}/board/${boardId}/stickers`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("🟨 스티커 응답:", data);

      if (data.success) {
        const board = document.querySelector(".board-wrapper");
        if (!board) return;

        const w = board.offsetWidth;
        const h = board.offsetHeight;

        const mapped = data.stickers.map((s) => ({
          src: s.PS_Type.startsWith("/")
            ? s.PS_Type
            : s.PS_Type.replace("http://", "https://"),
          x: (s.PS_X / 255) * w,
          y: (s.PS_Y / 255) * h,
        }));

        console.log("🟩 매핑된 스티커:", mapped);
        setStickers(mapped);
      }
    } catch (err) {
      console.error("❌ 스티커 로딩 에러:", err);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchStickers, 50);
    return () => clearTimeout(t);
  }, [cardsData]);

  // -------------------------------------------------------
  // 4. 스티커 저장
  // -------------------------------------------------------
  const saveStickerToDB = async (sticker) => {
    try {
      console.log("🆕 NEW STICKER:", sticker);

      const payload = {
        RU_id: user.RU_id,
        PS_Type: sticker.src,
        PS_X: sticker.scaledX,
        PS_Y: sticker.scaledY,
      };

      console.log("📤 payload:", payload);

      const res = await fetch(`${BACKEND_URL}/board/${boardId}/sticker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📥 저장 응답:", data);
    } catch (err) {
      console.error("❌ 스티커 저장 오류:", err);
    }
  };

  // -------------------------------------------------------
  // 5. 스티커 클릭 → 저장
  // -------------------------------------------------------
  const handleBoardClick = (e) => {
    if (!selectedSticker) return;

    console.log("💛 선택된 스티커:", selectedSticker);

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

    console.log("🆕 final sticker:", newSticker);

    setStickers((prev) => [...prev, newSticker]);
    saveStickerToDB(newSticker);
    setSelectedSticker(null);
  };

  // -------------------------------------------------------
  // ⭐ 기존 기능 1: 메시지 작성
  // -------------------------------------------------------
  const handleWriteComplete = async (data) => {
    try {
      const result = await createPaper({
        boardId,
        kakao_id: user.kakao_id,
        content: data.content,
        font: data.font,
        color: data.color,
        align: data.align,
        textColor: data.textColor,
        file: data.file,
      });

      if (result.success) {
        fetchBoard();
      } else {
        alert(result.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // -------------------------------------------------------
  // ⭐ 기존 기능 2: 카드 클릭 → 모달 열림
  // -------------------------------------------------------
  const handleCardClick = (c) => {
    setModalContent({
      id: c.id,
      title: c.title,
      fullContent: c.text,
      profileUrl: c.profileUrl,
      bgColor: c.bgColor,
      bgImage: c.bgImage,
      font: c.font,
      fontColor: c.fontColor,
      textAlign: c.textAlign,
      isMine: user?.RU_id === c.authorId,
    });

    setIsMemoModalOpen(true);
  };

  // -------------------------------------------------------
  // ⭐ 기존 기능 3: 페이퍼 삭제
  // -------------------------------------------------------
  const handleDeletePaper = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const res = await deletePaper(id, user.RU_id);

    if (res.success) {
      setIsMemoModalOpen(false);
      fetchBoard();
    } else {
      alert(res.message);
    }
  };

  // -------------------------------------------------------
  // ⭐ 기존 기능 4: 보드 삭제
  // -------------------------------------------------------
  const handleDeleteBoard = async () => {
    if (!window.confirm("정말 보드를 삭제하시겠습니까?")) return;
    const res = await deleteBoard(boardId);

    if (res.success) {
      navigate("/");
    } else {
      alert(res.message);
    }
  };

  // -------------------------------------------------------
  // 6. 렌더링
  // -------------------------------------------------------
  return (
    <div
      className={`${pageBgColor} min-h-screen relative board-wrapper`}
      onClick={handleBoardClick}
    >
      {/* 헤더 */}
      <Header
        title={pageTitle}
        leftContent="back"
        rightContent="아이콘"
        onRightClick={() => deleteBoard(boardId)}
      />

      {/* 카드 */}
      <div className="relative z-10 px-[5px]">
        {cardsData.length > 0 ? (
          <CardList cards={cardsData} onCardClick={handleCardClick} />
        ) : (
          <div className="flex justify-center py-20">
            <img src={noCardImage} className="w-[180px] opacity-80" />
          </div>
        )}
      </div>

      {/* 스티커 */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {stickers.map((s, i) => (
          <img
            key={i}
            src={s.src}
            className="absolute w-[90px] h-[90px]"
            style={{ top: s.y, left: s.x }}
            draggable={false}
          />
        ))}
      </div>

      {/* 메모 모달 */}
      <MemoModal
        {...modalContent}
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        onDelete={() => handleDeletePaper(modalContent.id)}
        boardTitle={pageTitle}
      />

      {/* 플로팅 버튼 */}
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
