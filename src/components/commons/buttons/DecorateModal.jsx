import React from "react";

// emo 폴더 전체 SVG 로드 (Vite)
const emoImages = import.meta.glob("@/assets/emo/*.svg", { eager: true });

function DecorateModal({ onClose, onSelect }) {
  // ⚠️ onSelect 없을 때 방어 + 디버깅
  const safeOnSelect =
    typeof onSelect === "function"
      ? onSelect
      : (src) => {
          console.warn(
            "[DecorateModal] onSelect가 전달되지 않았습니다. 선택된 스티커:",
            src
          );
        };

  const stickers = Object.values(emoImages).map((mod) => mod.default);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-end"
      onClick={onClose}
    >
      <div
        className="w-full p-0 shadow-lg rounded-t-2xl relative bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#1e1e1e] z-10 border-b border-gray-700">
          <button
            onClick={onClose}
            className="text-gray-400 font-medium hover:text-white text-sm"
          >
            닫기
          </button>
          <h2 className="text-lg text-white">스티커 꾸미기</h2>
          <span className="text-transparent select-none">닫기</span>
        </div>

        {/* 안내 문구 */}
        <div className="px-6 pt-3 pb-2">
          <p className="text-sm text-gray-300">
            아래 스티커 중 원하는 것을 선택해 붙여보세요 ✨
          </p>
        </div>

        {/* 스티커 목록 */}
        <div className="px-5 pb-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-5 gap-4 justify-items-center">
            {stickers.map((src, idx) => (
              <button
                key={idx}
                onClick={() => safeOnSelect(src)}
                className="w-[60px] h-[60px] bg-[#2a2a2a] rounded-xl 
                           flex items-center justify-center hover:scale-110 
                           transition-transform duration-200 hover:bg-[#333]"
              >
                <img
                  src={src}
                  alt={`emo-${idx}`}
                  className="w-[42px] h-[42px] object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecorateModal;
