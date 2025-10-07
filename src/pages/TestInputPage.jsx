import React, { useState } from 'react';
import TextInput from '@/components/commons/Inputs/TextInput'; 
import TextArea from '@/components/commons/Inputs/TextArea';

// Dropdown 컴포넌트와 폰트 옵션을 가져옵니다.
import Dropdown from '@/components/commons/Inputs/Dropdown';
import { FONT_OPTIONS } from '@/components/commons/Inputs/inputStyles';

function TestInputPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  // 폰트 상태 추가: 기본값은 첫 번째 옵션의 value
  const [fontStyle, setFontStyle] = useState(FONT_OPTIONS[0].value); 

  // 드롭다운 변경 핸들러
  const handleFontChange = (e) => {
      setFontStyle(e.target.value);
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-10 bg-gray-50 border border-gray-200 rounded-lg shadow-lg mt-10">

      {/* 1. TextInput 테스트 영역 */}
      <div className="space-y-2">
        <label className="text-lg font-bold text-gray-800 block">To.</label>
        <TextInput 
          placeholder="받는 사람의 이름 또는 제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        //백엔드 key 미지정
          name="paperTitle"
        />
        <p className="text-sm text-gray-500 pt-2">
            * TextInput (현재 입력 값: {title})
        </p>
      </div>

      {/* 2. Dropdown (폰트 선택) 영역 */}
      <div className="space-y-2">
        <Dropdown 
            options={FONT_OPTIONS}
            value={fontStyle}
            onChange={handleFontChange}
            className={fontStyle} 
        />
      </div>

      {/* 3. TextArea 테스트 영역 */}
      <div className="space-y-2">
        <label className="text-lg font-bold text-gray-800 block">메시지 내용</label>
        <TextArea
          placeholder="따뜻한 메시지를 작성해주세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          // Dropdown에서 선택된 폰트 스타일을 Prop으로 전달
          fontStyle={fontStyle} 
        />
        <p className="text-sm text-gray-500 pt-2">
            * TextArea (남은 글자 수: {500 - (message ? message.length : 0)}자)
        </p>
      </div>
    </div>
  );
}

export default TestInputPage;