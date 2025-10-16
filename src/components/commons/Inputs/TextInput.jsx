import React from "react";
import { TEXT_INPUT_BASE } from "@/components/commons/Inputs/inputStyles";

/**
 * 기본 단일 라인 텍스트 입력 컴포넌트 (밑줄 스타일)
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} [props.placeholder] - 입력 필드의 플레이스홀더 텍스트
 * @param {string} [props.value] - 입력 필드의 현재 값
 * @param {function} [props.onChange] - 값이 변경될 때 호출되는 이벤트 핸들러
 * @param {object} [props.rest] - 기타 모든 HTML Input 속성 (type, disabled, name 등)
 */
function TextInput({ placeholder, value, onChange, ...rest }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={TEXT_INPUT_BASE}
      {...rest}
    />
  );
}

export default TextInput;
