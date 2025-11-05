import React, { useState, useEffect } from "react";

import TextArea from "@/components/commons/Inputs/TextArea";
import Dropdown from "@/components/commons/Inputs/Dropdown";
import ColorBox from "@/components/commons/buttons/ColorBox";
import { FONT_OPTIONS } from "@/utils/constants/fontOptions.js";
/**
 * 페이퍼 작성/수정 모달 컴포넌트
 * @param {boolean} isOpen - 모달 열림 상태
 * @param {string} title - 모달 제목
 * @param {function} onClose - 닫기 버튼 클릭 시 호출
 * @param {function} onComplete - 완료 버튼 클릭 시 호출. (data) => {} 형태
 */

function PageModal({ isOpen, onClose, onComplete, title }) {
  const [content, setContent] = useState("");
  const [font, setFont] = useState(FONT_OPTIONS[0].value);

  useEffect(() => {
    if (isOpen) {
      setContent("");
      setFont(FONT_OPTIONS[0].value);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCompleteClick = () => {
    if (content.trim().length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    onComplete({
      content,
      font,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
          <h3 className="text-lg ">{title}</h3>
          <button
            onClick={handleCompleteClick}
            className=" text-blue-600 hover:text-blue-800"
          >
            완료
          </button>
        </div>

        <div className="p-4 space-y-6">
          {" "}
          <div className="space-y-2">
            <p className="text-sm ">내용을 적어주세요.</p>
            <TextArea
              placeholder="따뜻한 메시지를 남겨주세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fontStyle={font}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm ">폰트를 선택해주세요</p>
            <Dropdown
              options={FONT_OPTIONS.map((f) => ({
                value: f.value,
                label: f.label,
              }))}
              value={font}
              onChange={(e) => setFont(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageModal;
