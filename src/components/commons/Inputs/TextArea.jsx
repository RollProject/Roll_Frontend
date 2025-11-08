import React from "react";
import { TEXT_AREA_BASE_STATIC } from "@/components/commons/Inputs/inputStyles";

/**
 * 다중 라인 텍스트 입력 컴포넌트 (Textarea)
 * @param {string} [props.fontStyle] - 적용할 글꼴 스타일 (예: 'font-sans')
 * @param {string} [props.bgColor] - 적용할 배경색 Tailwind 클래스 (예: 'bg-yellow-200')
 * @param {string} [props.textColor] - 적용할 텍스트 색상 Tailwind 클래스 (예: 'text-black')
 * @param {string} [props.textAlign] - 적용할 텍스트 정렬 (left, center, right)
 * @param {object} props - 컴포넌트 props
 */

function TextArea({
  placeholder,
  value,
  onChange,
  maxLength = 500,
  fontStyle = "font-sans",
  bgColor = "bg-white",
  textColor = "text-black",
  textAlign = "text-left",
  ...rest
}) {
  const currentLength = value ? value.length : 0;

  const baseStyleWithoutBg = TEXT_AREA_BASE_STATIC.replace(
    /bg-\S+/g,
    ""
  ).trim();

  const alignClass = `text-${textAlign || "left"}`;
  const dynamicClasses = `${fontStyle} ${bgColor} ${textColor} ${alignClass}`;
  return (
    <div className="relative w-full">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={8}
        className={`${baseStyleWithoutBg} ${dynamicClasses}`}
        {...rest}
      />

      <span className="absolute bottom-3 right-4 text-[12px] text-gray-500">
        {currentLength}/{maxLength}
      </span>
    </div>
  );
}

export default TextArea;
