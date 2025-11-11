import React from "react";

function MemoModal({
  title,
  fullContent,
  isOpen,
  onClose,
  profileUrl,
  font = "font-sans",
}) {
  if (!isOpen) return null;

  return (
    // 1. 모달 배경
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 2. 모달 내용 컨테이너 */}
      <div
        className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b pb-2 mb-4">
          {profileUrl && (
            <img
              src={profileUrl}
              alt="작성자 프로필"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        {/* 3. 전체 내용 표시 */}
        <p
          className={`whitespace-pre-wrap text-gray-700 max-h-80 overflow-y-auto ${font}`}
          style={{ fontFamily: font.startsWith("font-") ? "" : font }}
        >
          {fullContent}
        </p>

        {/* 4. 닫기 버튼 */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemoModal;
