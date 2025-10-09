import React from "react";
import { DROPDOWN_BASE_STATIC } from '@/components/commons/Inputs/inputStyles';

/**
 * 기본 드롭다운 선택 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {Array<object>} props.options - 드롭다운 항목 목록. [{ value: string | number, label: string }] 형태
 * @param {string | number} props.value - 현재 선택된 값
 * @param {function} props.onChange - 값이 변경될 때 호출되는 이벤트 핸들러
 * @param {object} [props.rest] - 기타 모든 HTML Select 속성 (disabled, name, id 등)
 */
function Dropdown({ options, value, onChange, ...rest }) {
    
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={DROPDOWN_BASE_STATIC}
        {...rest}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;