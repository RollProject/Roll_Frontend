
export const COMMON_TEXT_STYLE = "text-[16px] leading-relaxed";

// TEXT_INPUT_BASE 정의
export const TEXT_INPUT_BASE = 
  `${COMMON_TEXT_STYLE} w-full border-b-[1px] pb-1 focus:outline-none 
   border-gray-300 focus:border-black placeholder:text-gray-400`;

// TextArea (다중 라인)에 사용되는 박스 스타일의 고정 부분
export const TEXT_AREA_BASE_STATIC = 
  `${COMMON_TEXT_STYLE} w-full resize-none p-4 rounded-[30px] 
   bg-white border-[1px] border-gray-300 focus:outline-none focus:border-black`;

// Dropdown (Select)에 사용되는 기본 스타일
export const DROPDOWN_BASE_STATIC = 
  `${COMMON_TEXT_STYLE} w-full px-4 py-3 border-[1px] rounded-[10px] 
   border-gray-300 focus:outline-none focus:border-gray-400 bg-white appearance-none cursor-pointer`;

// 드롭다운에서 사용할 폰트 옵션 목록 정의
export const FONT_OPTIONS = [
    { value: 'font-sans', label: 'Inter (기본 글꼴)', className: 'font-sans' },
    { value: 'font-serif', label: 'Serif 계열', className: 'font-serif' },
    { value: 'font-mono', label: 'Monospace 계열', className: 'font-mono' },
];