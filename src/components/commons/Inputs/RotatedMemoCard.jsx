import React from 'react';

/**
 * 롤링페이퍼 메시지 내용을 표시하는 회전된 메모지 카드 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.content - 표시할 메시지 내용
 * @param {string} props.fontStyle - 적용할 글꼴 스타일 (예: 'font-serif')
 * @param {string} props.bgColor - 배경 색상 (Tailwind 클래스, 현재는 투명 처리됨)
 * @param {number} props.rotationDegree - 회전 각도 (상위 컴포넌트에서 계산)
 * @param {boolean} [props.alignTop=false] - 메세지 종류에 따른 정렬 방식
 * @param {string} [props.className] - 추가 클래스
 */
function RotatedMemoCard({ content, fontStyle, bgColor = 'bg-yellow-100', className = '' }) {
    
    // -5도에서 5도 사이의 랜덤 각도를 계산하여 메모지 카드의 시각적 흥미를 높입니다.
    const rotationDegree = useMemo(() => {
        return Math.floor(Math.random() * 11) - 5; // -5에서 5
    }, []);

const MAX_PREVIEW_LENGTH = 75;
function RotatedMemoCard({ 
    content, 
    fontStyle, 
    bgColor, 
    rotationDegree,
    alignTop = false, 
    className = '' 
}) {
     const textToDisplay = content.length > MAX_PREVIEW_LENGTH
        ? content.slice(0, MAX_PREVIEW_LENGTH) + '...' // 75자를 넘으면 자르고 말줄임표 추가
        : content;

    const baseStyle = 
        "w-48 h-48 p-4 rounded-xl transition-all duration-300 overflow-hidden relative"; 

    return (
        <div 
             className={`${baseStyle} bg-transparent ${className}`} 
            style={{ 
                transform: `rotate(${rotationDegree}deg)`,
                backgroundImage: `url('/memo.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%', 
                backgroundPosition: 'center',
            }}
        >
            <p 
                  className={`text-sm text-gray-800 break-words absolute inset-0 p-4 ${fontStyle}`}
                style={{
                    whiteSpace: 'pre-wrap', 
                    ...textAlignmentStyle,
                }}
            >
                {textToDisplay}
                
            </p>
        </div>
    );
}

export default RotatedMemoCard;