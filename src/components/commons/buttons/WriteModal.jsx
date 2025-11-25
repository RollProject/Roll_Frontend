import React, { useState, useEffect, useRef } from "react";
import TextArea from "@/components/commons/Inputs/TextArea";
import { FONT_OPTIONS } from "@/utils/constants/fontOptions.js";
import ColorSelectModal from "@/components/commons/modal/ColorSelectModal";
import StyleToolbar from "@/components/commons/bar/StyleToolbar";
import TextColorSelectModal from "@/components/commons/modal/TextColorSelectModal";

const DEFAULT_BG_COLOR = "bg-white";
const DEFAULT_FONT = FONT_OPTIONS[0].value;

function WriteModal({ onClose, onComplete }) {
  const [content, setContent] = useState("");
  const [font, setFont] = useState(DEFAULT_FONT);
  const [color, setColor] = useState(DEFAULT_BG_COLOR);
  const [align, setAlign] = useState("center");
  const [textColor, setTextColor] = useState("text-black");
  const [isColorSelectOpen, setIsColorSelectOpen] = useState(false);
  const [isTextColorSelectOpen, setIsTextColorSelectOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setContent("");
    setFont(DEFAULT_FONT);
    setColor(DEFAULT_BG_COLOR);
    setAlign("center");
    setTextColor("text-black");
    setSelectedFile(null);
    setPreviewUrl(null);
  }, [onClose]);

  const handleCompleteClick = () => {
    if (selectedFile) {
      onComplete({
        content: "", // 이미지가 있으면 텍스트는 빈 값 처리
        font,
        color: "", // 이미지가 있으면 배경색 무시 (또는 빈 값)
        align,
        textColor,
        file: selectedFile,
      });
      onClose();
      return;
    }

    if (content.trim().length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    onComplete({ content, font, color, align, textColor, file: null });
    onClose();
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
    setIsColorSelectOpen(false);
  };

  const handleTextColorClick = () => {
    setIsTextColorSelectOpen(true);
  };

  const handleTextColorChange = (selectedColor) => {
    setTextColor(selectedColor);
    setIsTextColorSelectOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setContent("");
      setColor(DEFAULT_BG_COLOR);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
          <button
            onClick={onClose}
            className="text-gray-400 font-medium hover:text-white text-sm"
          >
            닫기
          </button>
          <h2 className="text-lg text-white">롤링페이퍼 메세지 작성</h2>
          <button
            onClick={handleCompleteClick}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            등록
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
          {previewUrl ? (
            <div className="relative flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 min-h-[300px]">
              <img
                src={previewUrl}
                alt="preview"
                className="max-w-full max-h-[50vh] object-contain rounded"
              />
              <button
                onClick={handleRemoveImage}
                className="mt-4 px-4 py-2 bg-red-500/80 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
              >
                이미지 취소하고 글쓰기
              </button>
              <p className="text-gray-400 text-xs mt-2">
                이미지 모드에서는 텍스트와 배경색이 적용되지 않습니다.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm mb-2 text-white">내용을 적어주세요.</p>
              <TextArea
                placeholder="따뜻한 메시지를 남겨주세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fontStyle={font}
                textAlign={align}
                textColor={textColor}
                bgColor={color}
              />
            </>
          )}

          <div className="flex justify-between items-center text-sm mt-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-400">from</span>
              <span className="text-blue-400">@현재로그인유저</span>
            </div>
          </div>
        </div>
        {!previewUrl ? (
          <StyleToolbar
            onBackgroundClick={() => setIsColorSelectOpen(true)}
            onTextColorClick={handleTextColorClick}
            onImageClick={handleImageClick}
            onAlignChange={setAlign}
            currentAlign={align}
            currentFont={font}
            onFontChange={setFont}
          />
        ) : (
          <div className="h-[60px] flex items-center justify-center text-gray-500 text-sm border-t border-gray-700">
            이미지가 첨부되었습니다.
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <ColorSelectModal
          isOpen={isColorSelectOpen}
          onClose={() => setIsColorSelectOpen(false)}
          onColorSelect={handleColorSelect}
          currentColor={color}
        />
        <TextColorSelectModal
          isOpen={isTextColorSelectOpen}
          onClose={() => setIsTextColorSelectOpen(false)}
          onColorSelect={handleTextColorChange}
          currentColor={textColor}
        />
      </div>
    </div>
  );
}

export default WriteModal;
