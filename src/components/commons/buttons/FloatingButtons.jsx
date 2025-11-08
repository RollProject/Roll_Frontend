import { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";

import WriteModal from "./WriteModal";
import DecorateModal from "./DecorateModal";

function FloatingButtons({ mode, onWriteComplete }) {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isDecorateOpen, setIsDecorateOpen] = useState(false);

  const handleWriteClick = () => setIsWriteOpen(true);
  const handleDecorateClick = () => setIsDecorateOpen(true);

  const handleWriteComplete = (data) => {
    if (onWriteComplete) {
      onWriteComplete(data);
    }
    setIsWriteOpen(false);
  };

  useEffect(() => {
    if (isWriteOpen || isDecorateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isWriteOpen, isDecorateOpen]);

  if (isWriteOpen) {
    return (
      <>
        <WriteModal
          onClose={() => setIsWriteOpen(false)}
          onComplete={handleWriteComplete}
        />
        {isDecorateOpen && (
          <DecorateModal onClose={() => setIsDecorateOpen(false)} />
        )}
      </>
    );
  }
  return (
    <>
      {isDecorateOpen && (
        <DecorateModal onClose={() => setIsDecorateOpen(false)} />
      )}

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
