import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/commons/bar/EditHeader";
import TextInput from "@/components/commons/Inputs/TextInput";
import ColorBox from "@/components/commons/buttons/ColorBox.jsx";
import ThemeSelector from "@/components/commons/buttons/ThemeSelector";
import { useUserStore } from "@/stores/userStore";
import { createBoard } from "@/api/board/createBoard";
import { DUMMY_COLORS } from "@/mock/colors";
import { DUMMY_THEMES } from "@/mock/themes";

function BoardCreatePage() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [selectedThemeId, setSelectedThemeId] = useState("null");
  const [selectedColor, setSelectedColor] = useState("bg-white");
  const [title, setTitle] = useState("");
  const { user } = useUserStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleComplete = async () => {
    if (title.trim().length === 0) {
      alert("⚠️ 롤링페이퍼 제목을 입력해주세요.");
      return;
    }
    if (!user || !user.id) {
      alert("⚠️ 로그인 정보(RU_id)를 찾을 수 없습니다. 다시 로그인해주세요.");
      return;
    }
    setIsCreating(true);

    const boardData = {
      title: title,
      bgcolor: selectedColor,
      RU_id: user.id,
    };
    try {
      const response = await createBoard(boardData);

      if (response && response.success && response.boardId) {
        alert("✅ 보드가 성공적으로 생성되었습니다!");

        navigate(`/board/${response.boardId}`);
      } else {
        alert(response.message || "❌ 보드 생성에 실패했습니다.");
      }
    } catch (error) {
      alert(`❌ 오류 발생: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleThemeClick = (themeId) => {
    const selectedTheme = DUMMY_THEMES.find((t) => t.id === themeId);
    if (selectedTheme && selectedTheme.type === "premium") {
      alert("이 테마는 유료 버전에서 사용 가능합니다.");
      return;
    }
    setSelectedThemeId(themeId);
  };

  const renderColorBoxes = DUMMY_COLORS.map((color, index) => (
    <ColorBox
      key={index}
      color={color}
      isSelected={selectedColor === color}
      onClick={() => setSelectedColor(color)}
    />
  ));

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          "https://roll-backend.onrender.com/session/session-info",
          {
            credentials: "include", // 세션 쿠키 필수
          }
        );

        if (!res.ok) throw new Error("세션 정보 요청 실패");
        const data = await res.json();

        console.log("🟢 세션 응답 전체:", data);
        console.log("👤 사용자 정보:", data.sessionData?.kakaoUser);

        if (data.sessionData?.kakaoUser) {
          setUser(data.sessionData.kakaoUser);
        } else {
          navigate("/auth");
        }
      } catch (err) {
        console.error("세션 확인 실패:", err);
        navigate("/auth");
      }
    };

    checkSession();
  }, [setUser, navigate]);

  return (
    <div className="relative min-h-screen bg-[#1e1e1e] pb-10">
      <Header title="롤링페이퍼 보드 생성" onComplete={handleComplete} />

      <div className="max-w-xl mx-auto p-4 pt-20 space-y-8">
        {/* To. 입력 영역 */}
        <section>
          <h2 className="text-base mb-3 text-white">To.</h2>
          <TextInput
            placeholder="받는 사람의 이름 또는 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#1e1e1e] border-b border-gray-600  text-white focus:border-white focus:outline-none transition duration-300"
          />
        </section>

        {/* 배경 선택 영역 */}
        <section>
          <h2 className="text-base mb-3 text-white">
            배경 화면을 선택해주세요.
          </h2>
          <div className="grid grid-cols-4 gap-2 justify-start">
            {renderColorBoxes}
          </div>
        </section>

        {/* 커스텀 테마 적용하기 영역 */}
        <section>
          <h2 className="text-base mb-3 text-white">커스텀 테마 적용하기</h2>
          <div className="space-y-2">
            {DUMMY_THEMES.map((theme) => (
              <ThemeSelector
                key={theme.id}
                themeName={theme.name}
                imageUrl={theme.image}
                isSelected={selectedThemeId === theme.id}
                onClick={() => handleThemeClick(theme.id)}
              />
            ))}
          </div>
        </section>
        {isCreating && (
          <div className="text-center text-blue-600 font-bold mt-4">
            보드 생성 중입니다...
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardCreatePage;
