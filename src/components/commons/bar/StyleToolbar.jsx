import React from "react";
import { IoText, IoColorFillOutline, IoImageOutline } from "react-icons/io5";
import {
  PiTextAlignLeftBold,
  PiTextAlignCenterBold,
  PiTextAlignRightBold,
} from "react-icons/pi";

/**
 * 롤링페이퍼 작성 시 하단에 붙는 스타일링 툴바 컴포넌트.
 */
export default function StyleToolbar({
  onBackgroundClick,
  onTextColorClick,
  onImageClick,
  onAlignChange,
  currentAlign,
  currentFont,
  onFontChange,
}) {
  const FONT_OPTIONS_DROPDOWN = [
    { value: "font-sans", label: "Inter (기본 글꼴)", className: "font-sans" },
    { value: "font-serif", label: "Serif 계열", className: "font-serif" },
    { value: "font-mono", label: "Monospace 계열", className: "font-mono" },
  ];

  const handleDropdownChange = (e) => {
    onFontChange(e.target.value);
  };

  return (
    <div className="w-full bg-[#1e1e1e] px-6 pt-3 pb-6 border-t border-gray-700 sticky bottom-0 z-20">
      {/* 1. 스타일링 아이콘 버튼 영역 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {/* 텍스트 (글자색) */}
          <button
            onClick={onTextColorClick}
            className="flex flex-col items-center text-xs text-white"
          >
            <IoText size={24} className="text-white" />
            <span className="mt-1">텍스트</span>
          </button>

          {/* 배경 (ColorSelectModal 열기) */}
          <button
            onClick={onBackgroundClick}
            className="flex flex-col items-center text-xs text-white"
          >
            <IoColorFillOutline size={24} className="text-white" />
            <span className="mt-1">배경</span>
          </button>

          {/* 이미지 */}
          <button
            onClick={onImageClick}
            className="flex flex-col items-center text-xs text-white"
          >
            <IoImageOutline size={24} className="text-white" />
            <span className="mt-1">이미지</span>
          </button>
        </div>

        {/* 정렬 버튼 그룹 */}
        <div className="flex space-x-2 border border-gray-700 rounded-full p-1">
          <button
            onClick={() => onAlignChange("left")}
            className={`p-1 rounded-full ${
              currentAlign === "left"
                ? "bg-white text-black"
                : "bg-transparent text-gray-400"
            }`}
          >
            <PiTextAlignLeftBold size={20} />
          </button>
          <button
            onClick={() => onAlignChange("center")}
            className={`p-1 rounded-full ${
              currentAlign === "center"
                ? "bg-white text-black"
                : "bg-transparent text-gray-400"
            }`}
          >
            <PiTextAlignCenterBold size={20} />
          </button>
          <button
            onClick={() => onAlignChange("right")}
            className={`p-1 rounded-full ${
              currentAlign === "right"
                ? "bg-white text-black"
                : "bg-transparent text-gray-400"
            }`}
          >
            <PiTextAlignRightBold size={20} />
          </button>
        </div>
      </div>

      {/* 2. 폰트 선택 영역: 드롭다운으로 통합 */}
      <div className="flex w-full mt-4">
        <select
          value={currentFont}
          onChange={handleDropdownChange}
          className={`w-full px-3 py-2 text-sm rounded-lg font-medium bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 ${currentFont}`}
          style={{ fontFamily: currentFont }}
        >
          {FONT_OPTIONS_DROPDOWN.map((font) => (
            <option
              key={font.value}
              value={font.value}
              className={font.className}
            >
              {font.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
