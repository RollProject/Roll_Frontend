import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/commons/bar/EditHeader";
import TextInput from "@/components/commons/Inputs/TextInput";
import ColorBox from "@/components/commons/buttons/ColorBox.jsx";
import ThemeSelector from "@/components/commons/buttons/ThemeSelector";

import { DUMMY_COLORS } from "@/mock/colors";
import { DUMMY_THEMES } from "@/mock/themes";

function BoardCreatePage() {
  const navigate = useNavigate();

  const [selectedThemeId, setSelectedThemeId] = useState("null");
  const [selectedColor, setSelectedColor] = useState("bg-blue-200");
  const [title, setTitle] = useState("");

  const handleComplete = () => {
    console.log("보드 생성 로직 실행 (백엔드 전송)");
    navigate("/");
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

  return (
    <div className="relative min-h-screen bg-gray-50 pb-10">
      <Header title="롤링페이퍼 보드 생성" onComplete={handleComplete} />

      <div className="max-w-xl mx-auto p-4 pt-20 space-y-8">
        {/* To. 입력 영역 */}
        <section>
          <h2 className="text-base font-bold mb-3">To.</h2>
          <TextInput
            placeholder="받는 사람의 이름 또는 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        {/* 배경 선택 영역 */}
        <section>
          <h2 className="text-base font-bold mb-3">
            배경 화면을 선택해주세요.
          </h2>
          <div className="grid grid-cols-4 gap-2 justify-start">
            {renderColorBoxes}
          </div>
        </section>

        {/* 커스텀 테마 적용하기 영역 */}
        <section>
          <h2 className="text-base font-bold mb-3">커스텀 테마 적용하기</h2>
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
      </div>
    </div>
  );
}

export default BoardCreatePage;
