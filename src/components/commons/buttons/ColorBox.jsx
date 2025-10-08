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
  
  // 공통 스타일: 둥근 모서리, 고정 크기
  const baseStyle = 
    "w-14 h-14 rounded-xl shadow-md transition-all duration-150 ease-in-out cursor-pointer";
    
  // 선택 박스 테두리
  const selectedStyle = isSelected 
    ? "ring-2 ring-offset-2 ring-black border-[2px] border-gray-400" // 선택시 두꺼운 테두리
    : "hover:shadow-lg"; // 선택 안됨 마우스 올리며 그림자 효과

  return (

    <div
      className={`${baseStyle} ${color} ${selectedStyle}`}
      onClick={onClick}
      {...rest}
    >
    </div>
  );
}

export default ColorBox;