import React from "react";
import { FiTrash2 } from "react-icons/fi";

const BACKEND_URL = "https://roll-backend.onrender.com";

function MemoModal({
  title,
  fullContent,
  isOpen,
  onClose,
  profileUrl,
  bgImage,
  bgColor,
  font = "font-sans",
  fontColor = "text-gray-700",
  textAlign = "text-left",
  isMine,
  onDelete,
}) {
  if (!isOpen) return null;
  const alignClass = `text-${textAlign || "left"}`;
  const imageUrl = bgImage ? `${BACKEND_URL}${bgImage}` : null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`p-6 rounded-lg shadow-2xl max-w-sm w-full relative max-h-[90vh] overflow-y-auto 
        ${imageUrl ? "bg-white" : bgColor || "bg-white"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 부분 */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
          <div className="flex items-center gap-3">
            {profileUrl && (
              <img
                src={profileUrl}
                alt="프로필"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>

          {/* 🗑️ [핵심] 내 글일 때만 삭제 버튼 표시 */}
          {isMine && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // 모달 닫힘 방지
                onDelete();
              }}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="삭제하기"
            >
              {/* 아이콘이 없으면 '삭제' 글자만 써도 됨 */}
              <FiTrash2 size={20} />
            </button>
          )}
        </div>

        {/* ... 이미지 및 내용 표시 (기존 코드 유지) ... */}
        {imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <img
              src={imageUrl}
              alt="첨부"
              className="w-full h-auto object-cover max-h-[300px]"
            />
          </div>
        )}

        <p
          className={`whitespace-pre-wrap overflow-y-auto ${font} ${fontColor} ${alignClass}`}
          style={{ minHeight: imageUrl ? "auto" : "100px" }}
        >
          {fullContent}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-medium text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemoModal;
