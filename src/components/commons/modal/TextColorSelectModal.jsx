import React from "react";
import ColorBox from "@/components/commons/buttons/ColorBox";
const TEXT_COLOR_OPTIONS = [
  { class: "text-black", label: "검정" },
  { class: "text-white", label: "흰색 (Dark BG용)" },
  { class: "text-red-600", label: "빨강" },
  { class: "text-blue-600", label: "파랑" },
  { class: "text-green-600", label: "초록" },
  { class: "text-purple-600", label: "보라" },
  { class: "text-yellow-600", label: "노랑" },
  { class: "text-gray-600", label: "회색" },
];

function TextColorSelectModal({
  isOpen,
  onClose,
  onColorSelect,
  currentColor,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center p-4">
      <div
        className="bg-gray-800 text-white w-full max-w-sm rounded-lg p-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl  mb-4">글자색 전체 목록</h3>
        <div className="grid grid-cols-4 gap-3">
          {TEXT_COLOR_OPTIONS.map((c) => (
            <div key={c.class} className="flex flex-col items-center">
              <button
                onClick={() => {
                  onColorSelect(c.class);
                  onClose();
                }}
                className={`w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center transition
                                            ${c.class} ${
                  c.class === "text-white" ? "bg-gray-700" : ""
                }
                                            ${
                                              c.class === currentColor
                                                ? "ring-4 ring-offset-2 ring-offset-gray-800 ring-white"
                                                : ""
                                            }`}
              >
                {/* 미리보기 텍스트 */}
                <span className={`text-xl ${c.class}`}>Aa</span>
              </button>
              <span className="text-xs text-gray-400 mt-1">{c.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white font-medium"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextColorSelectModal;
