import React from "react";

function DecorateModal({ onClose, onSelect }) {
  const safeOnSelect =
    typeof onSelect === "function"
      ? onSelect
      : (src) => console.warn("[DecorateModal] onSelect 없음:", src);

  // 🎯 public/stickers/emo 폴더의 파일명 리스트를 직접 정의
  const stickerCount = 19;
  const stickers = Array.from({ length: stickerCount }, (_, i) => {
    return `/stickers/emo/${i + 1}.svg`;
  });

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-end"
      onClick={onClose}
    >
      <div
        className="w-full p-0 shadow-lg rounded-t-2xl relative bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
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

        <div className="px-6 pt-3 pb-2">
          <p className="text-sm text-gray-300">스티커를 선택해 붙여보세요 ✨</p>
        </div>

        {/* 스티커 리스트 */}
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
                  draggable={false}
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
