import React from "react";
import ColorBox from "@/components/commons/buttons/ColorBox";

const ALL_COLORS = [
  "bg-blue-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-green-200",
  "bg-lime-200",
  "bg-orange-200",
  "bg-white",
  "bg-red-200",
  "bg-indigo-200",
  "bg-teal-200",
  "bg-cyan-200",
  "bg-gray-300",
];

function ColorSelectModal({ isOpen, onClose, onColorSelect, currentColor }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1e1e1e]/90 z-[1000] flex justify-center items-center p-4">
      <div
        className="bg-gray-800 text-white w-full max-w-sm rounded-lg p-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl  mb-4">배경색 전체 목록</h3>
        <div className="grid grid-cols-4 gap-3">
          {ALL_COLORS.map((c) => (
            <ColorBox
              key={c}
              color={c}
              isSelected={currentColor === c}
              onClick={() => {
                onColorSelect(c);
                onClose();
              }}
            />
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

export default ColorSelectModal;
