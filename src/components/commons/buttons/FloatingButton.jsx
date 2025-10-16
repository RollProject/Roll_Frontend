import React from "react";

/**
 * FAB 버튼 클릭 시 나타나는 플로팅 옵션 메뉴입니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {Array<object>} props.options - 메뉴 항목 목록 [{ label: string, action: string }]
 * @param {function} props.onSelect - 항목 선택 시 실행될 핸들러
 */

function FloatingButton({ options, onSelect }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 pt-0 bg-white rounded-t-2xl shadow-2xl 
                       transform transition-transform duration-300 ease-out"
      style={{ transform: "translateY(0%)" }}
    >
      <div className="space-y-1 pb-4 pt-4">
        {options.map((item) => (
          <button
            key={item.action}
            onClick={() => onSelect(item.action)}
            className="block w-full px-4 py-3 text-center text-gray-700 hover:bg-gray-100 rounded-md whitespace-nowrap text-base font-medium"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FloatingButton;
