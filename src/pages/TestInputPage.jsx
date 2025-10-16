import React, { useState, useMemo } from "react";

import TextInput from "@/components/commons/Inputs/TextInput";
import TextArea from "@/components/commons/Inputs/TextArea";
import Dropdown from "@/components/commons/Inputs/Dropdown";
import RotatedMemoCard from "@/components/commons/card/Card";
import WriteButton from "@/components/commons/buttons/WriteButton";
import { FONT_OPTIONS } from "@/utils/constants/fontOptions.js";
import Card from "@/components/commons/card/Card";

function TestInputPage() {
  // 폼 상태 관리
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [fontStyle, setFontStyle] = useState(FONT_OPTIONS[0].value);

  // 드롭다운 변경
  const handleFontChange = (e) => {
    setFontStyle(e.target.value);
  };

  // FAB 버튼 클릭 핸들러 (테스트용)
  const handleFABClick = () => {
    alert("버튼이 클릭되었습니다! (새 메시지 작성 액션)");
  };
  const rotationDegree = useMemo(() => {
    // -5도에서 5도 사이의 랜덤 각도 (CardList의 회전 범위와 통일하는 것이 좋습니다. 현재는 -1 ~ 1도)
    return Math.floor(Math.random() * 3) - 1;
  }, []);
  return (
    <div className="relative min-h-screen">
      <div className="p-8 max-w-xl mx-auto space-y-10 bg-gray-50 border border-gray-200 rounded-lg shadow-lg mt-10 pb-20">
        {/* 헤더 또는 제목 */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          공통 입력 컴포넌트 테스트 화면 (Font 연동)
        </h1>

        {/* 1. TextInput (제목/대상) 영역 */}
        <div className="space-y-2">
          <label className="text-lg font-bold text-gray-800 block">To.</label>
          <TextInput
            placeholder="받는 사람의 이름 또는 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="paperTitle"
          />
        </div>

        {/* 2. Dropdown (폰트 선택) 영역 */}
        <div className="space-y-2">
          <label className="text-lg font-bold text-gray-800 block">
            폰트를 선택해 주세요.
          </label>
          <Dropdown
            options={FONT_OPTIONS}
            value={fontStyle}
            onChange={handleFontChange}
            name="messageFont"
            className={fontStyle}
          />
        </div>

        {/* 3. TextArea (메시지 내용) 영역 */}
        <div className="space-y-2">
          <label className="text-lg font-bold text-gray-800 block">
            메시지 내용
          </label>
          <TextArea
            placeholder="따뜻한 메시지를 작성해주세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            fontStyle={fontStyle}
            name="messageContent"
          />
          <p className="text-sm text-gray-500 pt-2 text-right">
            남은 글자 수: {500 - (message ? message.length : 0)}자
          </p>
        </div>

        {/* 4. 작성 내용 미리보기 영역 (RotatedMemoCard 사용) */}
        <div className="mt-10 pt-5 border-t border-gray-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            작성 내용 미리보기 (회전 카드)
          </h2>
          <div className="flex flex-wrap justify-center h-64">
            <Card
              title={title} // ⭐️ 제목 Prop 전달 (필수)
              content={message || "메시지를 입력해 보세요."} // ⭐️ 내용 Prop 전달
              fontStyle={fontStyle} // ⭐️ 폰트 스타일 전달
              isFullView={true} // ⭐️ 상세 내용 미리보기 모드로 설정
              rotationDegree={rotationDegree} // ⭐️ 회전 각도 전달 (필수) ⭐️
              // Card 컴포넌트는 GridItem의 역할을 하지 않으므로 grid-cols 클래스는 제거합니다.
              className="w-full"
            />
          </div>
        </div>

        <div className="h-20"></div>
      </div>

      {/* 플러스 버튼 추가  */}
      <WriteButton onClick={handleFABClick} />
    </div>
  );
}

export default TestInputPage;
