import React from "react";

/**
 * 색상 선택 및 배경 미리보기에 사용되는 둥근 사각형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.color - 배경으로 사용할 Tailwind CSS 색상 클래스 (예: 'bg-blue-300', 'bg-white')
 * @param {boolean} [props.isSelected=false] - 현재 선택된 상태인지 여부 (선택 시 테두리 표시)
 * @param {function} [props.onClick] - 상자 클릭 시 실행될 이벤트 핸들러
 * @param {object} [props.rest] - 기타 모든 HTML Div 속성 (className 등)
 */
function ColorBox({ color, isSelected = false, onClick, ...rest }) {
  const baseStyle =
    "w-full aspect-square rounded-xl shadow-md transition-all duration-150 ease-in-out cursor-pointer";

  const selectedStyle = isSelected
    ? "ring-4 ring-inset ring-blue-500"
    : "hover:shadow-lg";
  return (
    <div
      className={`${baseStyle} ${color} ${selectedStyle}`}
      onClick={onClick}
      {...rest}
    ></div>
  );
}

export default ColorBox;
