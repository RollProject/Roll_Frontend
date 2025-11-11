import React, { useState, useEffect } from "react";
import TextArea from "@/components/commons/Inputs/TextArea";
import { FONT_OPTIONS } from "@/utils/constants/fontOptions.js";
import ColorSelectModal from "@/components/commons/modal/ColorSelectModal";
import StyleToolbar from "@/components/commons/bar/StyleToolbar";
import TextColorSelectModal from "@/components/commons/modal/TextColorSelectModal";

const DEFAULT_BG_COLOR = "bg-white";
const DEFAULT_FONT = FONT_OPTIONS[0].value;

function WriteModal({ onClose, onComplete }) {
  const [content, setContent] = useState("");
  const [font, setFont] = useState(DEFAULT_FONT);
  const [color, setColor] = useState(DEFAULT_BG_COLOR);
  const [align, setAlign] = useState("center");
  const [textColor, setTextColor] = useState("text-black");
  const [isColorSelectOpen, setIsColorSelectOpen] = useState(false);
  const [isTextColorSelectOpen, setIsTextColorSelectOpen] = useState(false);

  useEffect(() => {
    setContent("");
    setFont(DEFAULT_FONT);
    setColor(DEFAULT_BG_COLOR);
    setAlign("center");
    setTextColor("text-black");
  }, [onClose]);

  const handleCompleteClick = () => {
    if (content.trim().length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    onComplete({ content, font, color, align, textColor });
    onClose();
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
    setIsColorSelectOpen(false);
  };

  const handleTextColorClick = () => {
    setIsTextColorSelectOpen(true);
  };

  const handleTextColorChange = (selectedColor) => {
    setTextColor(selectedColor);
    setIsTextColorSelectOpen(false);
  };

  const handleImageClick = () => {
    alert("이미지 첨부 기능 구현 필요");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onClose}
    >
      {/* 2. 모달 컨텐츠 */}
      <div
        className="w-full p-0 shadow-lg rounded-t-2xl relative bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 헤더... */}
        <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#1e1e1e] z-10 border-b border-gray-700">
          <button
            onClick={onClose}
            className="text-gray-400 font-medium hover:text-white text-sm"
          >
            닫기
          </button>
          <h2 className="text-lg  text-white">롤링페이퍼 메세지 작성</h2>
          <button
            onClick={handleCompleteClick}
            className="text-blue-400  hover:text-blue-300 text-sm"
          >
            등록
          </button>
        </div>

        {/* 내용 입력 영역 */}
        <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
          <p className="text-sm  mb-2 text-white">내용을 적어주세요.</p>
          <TextArea
            placeholder="따뜻한 메시지를 남겨주세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fontStyle={font}
            textAlign={align}
            textColor={textColor}
            bgColor={color}
          />

          {/* From 정보 */}
          <div className="flex justify-between items-center text-sm mt-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-400">from</span>
              <span className=" text-blue-400">@현재로그인유저</span>
            </div>
          </div>
        </div>

        {/* 하단 스타일 툴바 */}
        <StyleToolbar
          onBackgroundClick={() => setIsColorSelectOpen(true)}
          onTextColorClick={handleTextColorClick}
          onImageClick={handleImageClick}
          onAlignChange={setAlign}
          currentAlign={align}
          currentFont={font}
          onFontChange={setFont}
        />

        {/* ColorSelectModal 렌더링 */}
        <ColorSelectModal
          isOpen={isColorSelectOpen}
          onClose={() => setIsColorSelectOpen(false)}
          onColorSelect={handleColorSelect}
          currentColor={color}
        />

        {/* TextColorSelectModal 렌더링 */}
        <TextColorSelectModal
          isOpen={isTextColorSelectOpen}
          onClose={() => setIsTextColorSelectOpen(false)}
          onColorSelect={handleTextColorChange}
          currentColor={textColor}
        />
      </div>
    </div>
  );
}

export default WriteModal;
