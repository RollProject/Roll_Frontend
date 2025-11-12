import { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";

import WriteModal from "./WriteModal";
import DecorateModal from "./DecorateModal";

function FloatingButtons({ mode, onWriteComplete, onDecorateClick }) {
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const handleWriteClick = () => setIsWriteOpen(true);
  const handleWriteComplete = (data) => {
    if (onWriteComplete) onWriteComplete(data);
    setIsWriteOpen(false);
  };

  // 🧩 “꾸미기” 버튼 클릭 시 부모 콜백 실행
  const handleDecorateClick = () => {
    if (onDecorateClick) {
      onDecorateClick(); // ✅ BoardPage의 setIsDecorateModalOpen(true)
    }
  };

  useEffect(() => {
    document.body.style.overflow = isWriteOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isWriteOpen]);

  return (
    <>
      {/* 📝 메모 작성 모달 */}
      {isWriteOpen && (
        <WriteModal
          onClose={() => setIsWriteOpen(false)}
          onComplete={handleWriteComplete}
        />
      )}

      {/* 🪄 플로팅 버튼 UI */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {mode >= 1 && (
          <button
            onClick={handleWriteClick}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-200 shadow-md hover:bg-gray-300 active:scale-95 transition"
          >
            <FiEdit3 size={26} className="text-black" />
          </button>
        )}

        {mode === 2 && (
          <button
            onClick={handleDecorateClick}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-200 shadow-md hover:bg-gray-300 active:scale-95 transition"
          >
            <LuSparkles size={26} className="text-black" />
          </button>
        )}
      </div>
    </>
  );
}

export default FloatingButtons;
