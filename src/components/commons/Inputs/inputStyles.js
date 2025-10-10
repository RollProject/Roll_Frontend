
export const COMMON_TEXT_STYLE = "text-[16px] leading-relaxed";

// TEXT_INPUT_BASE 정의
export const TEXT_INPUT_BASE = 
   `${COMMON_TEXT_STYLE} w-full border-b-[1px] pb-1 border-gray-300 placeholder:text-gray-400
   focus:outline-none 
   focus:border-b-[2x] focus:border-black`; 

export const TEXT_AREA_BASE_STATIC = 
  `${COMMON_TEXT_STYLE} w-full resize-none p-4 rounded-[30px] 
   bg-white border-[1px] border-gray-300 outline-none transition-all duration-150
   focus:border-[2px] focus:border-black`; 

// Dropdown (Select)에 사용되는 기본 스타일
export const DROPDOWN_BASE_STATIC = 
  `${COMMON_TEXT_STYLE} w-full px-4 py-3 rounded-[10px] bg-white appearance-none cursor-pointer
   border-[1px] border-gray-300 outline-none transition-all duration-150
   focus:border-[2px] focus:border-black focus:border-gray-400`;