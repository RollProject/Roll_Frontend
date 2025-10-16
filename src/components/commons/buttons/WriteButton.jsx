import React from "react";

/**
 * 플로팅 액션 버튼 : 오른쪽 하단에 고정된 주요 액션 버튼입니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {function} props.onClick - 버튼 클릭 시 실행될 이벤트 핸들러 (필수)
 * @param {React.ReactNode} [props.children] - 버튼 내부에 들어갈 내용 (기본값: + 아이콘)
 * @param {string} [props.bgColor="bg-black"] - 버튼 배경색 Tailwind 클래스
 * @param {string} [props.textColor="text-white"] - 버튼 내부 아이콘/텍스트 색상 Tailwind 클래스
 * @param {object} [props.rest] - 기타 모든 HTML Button 속성
 */
function WriteButton({
  onClick,
  children,
  bgColor = "bg-black",
  textColor = "text-white",
  ...rest
}) {
  // 기본 스타일: 원형, 고정 크기, 그림자, 부드러운 전환 효과
  const baseStyle =
    "w-14 h-14 rounded-full shadow-xl fixed bottom-6 right-6 flex items-center justify-center z-50 transition-transform duration-200 ease-in-out hover:scale-105";

  return (
    <button
      className={`${baseStyle} ${bgColor} ${textColor}`}
      onClick={onClick}
      {...rest}
    >
      {children || (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      )}
    </button>
  );
}

export default WriteButton;
