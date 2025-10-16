import React from "react";
import { TEXT_AREA_BASE_STATIC } from "@/components/commons/Inputs/inputStyles";

/**
 * 다중 라인 텍스트 입력 컴포넌트 (Textarea)
 * * @param {string} [props.fontStyle] - 적용할 글꼴 스타일 (예: 'font-inter', 'font-serif')
 * @param {object} props - 컴포넌트 props (생략된 JSDoc은 상단에 유지)
 */

function TextArea({
  placeholder,
  value,
  onChange,
  maxLength = 500,
  fontStyle = "font-sans",
  ...rest
}) {
  const currentLength = value ? value.length : 0;

  return (
    <div className="relative w-full">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={8}
        // 기존 고정 스타일에 동적 폰트 스타일을 추가
        className={`${TEXT_AREA_BASE_STATIC} ${fontStyle}`}
        {...rest}
      />

      <span className="absolute bottom-3 right-4 text-[12px] text-gray-500">
        {currentLength}/{maxLength}
      </span>
    </div>
  );
}

export default TextArea;
