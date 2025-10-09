// src/components/commons/RotatedMemoCard.jsx

import React, { useMemo } from 'react';

/**
 * 롤링페이퍼 메시지 내용을 표시하는 회전된 메모지 카드 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.content - 표시할 메시지 내용 (TextArea에서 입력받은 값)
 * @param {string} props.fontStyle - 적용할 글꼴 스타일 (예: 'font-serif', 'font-mono')
 * @param {string} [props.bgColor='bg-yellow-100'] - 배경으로 사용할 Tailwind CSS 색상 클래스
 * @param {string} [props.className] - 추가적으로 적용할 Tailwind CSS 클래스
 */
function RotatedMemoCard({ content, fontStyle, bgColor = 'bg-yellow-100', className = '' }) {
    
    // -5도에서 5도 사이의 랜덤 각도를 계산하여 메모지 카드의 시각적 흥미를 높입니다.
    const rotationDegree = useMemo(() => {
        return Math.floor(Math.random() * 11) - 5; // -5에서 5
    }, []);

    // 기본 스타일: 둥근 모서리, 고정 크기 (예시), 그림자
    const baseStyle = 
        "w-48 h-48 p-4 rounded-xl shadow-lg transition-all duration-300 overflow-hidden";
        // ⭐️ 크기를 w-48 h-48 (약 192px)로 키워서 텍스트를 담을 수 있게 설정

    return (
        <div 
            className={`${baseStyle} ${bgColor} ${className}`}
            style={{ 
                // ⭐️ CSS style 속성에 직접 회전 각도를 적용합니다.
                transform: `rotate(${rotationDegree}deg)`,
                // 글꼴 스타일과 일관성을 위해 폰트 클래스를 적용합니다.
                 backgroundImage: `url('/memo.svg')`, 
                backgroundRepeat: 'repeat',
                 backgroundRepeat: 'no-repeat', // ⭐️ 반복 끄기
                backgroundSize: 'cover',        // ⭐️ 카드를 꽉 채우도록
                backgroundPosition: 'center',
            }}
        >
             <p 
            className={`text-sm text-gray-800 break-words h-full ${fontStyle} p-2`} // p-2 추가
            style={{
                // ⭐️ 핵심 수정: 입력된 줄 바꿈을 유지하도록 whiteSpace 속성 적용 ⭐️
                whiteSpace: 'pre-wrap', 
                // 글꼴 스타일과 정렬은 그대로 유지
                display: 'flex',
                
            }}
        >
                {content}
            </p>
        </div>
    );
}

export default RotatedMemoCard;