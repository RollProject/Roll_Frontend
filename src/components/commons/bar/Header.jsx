import React from "react";

/**
 * 페이지/모달의 최상단에 고정되는 헤더 컴포넌트입니다.
 * leftContent, title, rightContent 3개의 매개변수
 * * @param {object} props
 * @param {string} props.title - 헤더 중앙에 표시될 제목
 * @param {React.ReactNode} props.leftContent - 헤더 왼쪽에 표시될 요소 (예: 닫기 버튼, 뒤로 가기 아이콘)
 * @param {React.ReactNode} props.rightContent - 헤더 오른쪽에 표시될 요소 (예: 완료 버튼, 메뉴 아이콘)
 */

function Header({ title = "", leftContent = null, rightContent = null }) {
  return (
    <header className="relative w-full max-w-xl mx-auto bg-white border-b border-gray-200 z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* 1. 왼쪽 영역 */}
        {/* pl-4: 화면 좌측 여백, pr-1: 중앙 제목과의 최소 여백 */}
        <div className="absolute left-0 top-0 bottom-0 font-bold flex items-center pl-4 pr-1">
          {leftContent}
        </div>

        {/* 2. 중앙 제목 영역*/}
        {/* inset-0으로 공간을 덮고, px-12로 좌우 버튼 영역을 침범X. */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-lg font-bold truncate px-12 pointer-events-auto">
            {title}
          </h1>
        </div>

        {/* 3. 오른쪽 영역 (Absolute: Right) */}
        {/* pr-4: 화면 우측 여백, pl-1: 중앙 제목과의 최소 여백 */}
        <div className="absolute right-0 top-0 bottom-0 font-bold flex items-center pl-1 pr-4">
          {rightContent}
        </div>
      </div>
    </header>
  );
}

export default Header;
