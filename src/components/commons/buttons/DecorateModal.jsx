import React from "react";

function DecorateModal({ onClose, onSelect }) {
  const safeOnSelect =
    typeof onSelect === "function"
      ? onSelect
      : (src) => console.warn("onSelect 없음:", src);

  // public/stickers/emo 디렉토리 기반
  const stickerList = Array.from(
    { length: 30 },
    (_, i) => `/stickers/emo/${i + 1}.svg`
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-end"
      onClick={onClose}
    >
      <div
        className="w-full p-0 shadow-lg rounded-t-2xl relative bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#1e1e1e] z-10 border-b border-gray-700">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            닫기
          </button>
          <h2 className="text-lg text-white">스티커 꾸미기</h2>
          <span className="text-transparent">닫기</span>
        </div>

        <div className="px-6 pt-3 pb-2">
          <p className="text-sm text-gray-300">스티커를 선택해 붙여보세요 ✨</p>
        </div>

        <div className="px-5 pb-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-5 gap-4 justify-items-center">
            {stickerList.map((src, idx) => (
              <button
                key={idx}
                onClick={() => safeOnSelect(src)}
                className="w-[60px] h-[60px] bg-[#2a2a2a] rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
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
