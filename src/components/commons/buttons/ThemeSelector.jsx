import React from "react";
/**
 * 롤링페이퍼 배경 테마를 선택하는 항목 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.themeName - 테마의 이름 (예: "눈 테마 적용하기")
 * @param {string} props.imageUrl - 테마 미리보기 이미지의 URL 또는 경로
 * @param {boolean} [props.isSelected=false] - 현재 선택된 상태인지 여부
 * @param {function} [props.onClick] - 항목 클릭 시 실행될 이벤트 핸들러
 * @param {object} [props.rest] - 기타 모든 HTML Div 속성 (className 등)
 */
function ThemeSelector({ themeName, imageUrl, isSelected = false, onClick, ...rest }) {
  
  // 공통 기본 스타일: 둥근 모서리, 패딩, 부드러운 전환 효과, 투명도
   const baseStyle = 
    "flex items-center p-3 gap-4 rounded-[12px] cursor-pointer transition-all duration-200"; 
    
  const selectedStyle = isSelected 
    ? "border-[2px] border-black bg-white shadow-lg opacity-100"  //선택되면 진하게
    : "border border-gray-300 bg-gray-50 opacity-50 hover:opacity-75";  //선택안된건 불투명도 낮춰서 흐릿하게
  
  const imageStyle = "w-16 h-16 rounded-lg object-cover";

  return (
    <div
      className={`${baseStyle} ${selectedStyle}`}
      onClick={onClick}
      {...rest}
    >
      {/* 1. 미리보기 이미지 */}
      {/* 선택 상태에 따라 이미지 주변 테두리 스타일 적용 */}
      {/* 선택시 이미지 파일에 검은색 테두리 지움 */}
       <div className="flex-shrink-0 rounded-lg overflow-hidden border border-transparent"> 
          <img 
              src={imageUrl} 
              alt={`${themeName} 미리보기`}
              className={imageStyle}
          />
      </div>

      {/* 2. 테마 이름 및 설명 */}
      <div className="flex-grow text-left">
          <p className="text-base font-medium text-gray-800">{themeName}</p>
      </div>

      {/* 3. 미리보기 버튼 (오른쪽 끝) */}
      <div className="flex-shrink-0 text-right">
          <span className="text-sm font-bold text-gray-500 hover:text-black">미리보기</span>
      </div>
    </div>
  );
}

export default ThemeSelector;