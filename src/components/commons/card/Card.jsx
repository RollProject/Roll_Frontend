import React from 'react';

/**
 * 롤링페이퍼 메시지 내용을 표시하는 회전된 메모지 카드 컴포넌트입니다.
 * 이 컴포넌트는 GridItem에 의해 호출되며, 각도(rotationDegree)를 Prop으로 받습니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.content - 표시할 메시지 내용
 * @param {string} props.fontStyle - 적용할 글꼴 스타일 (예: 'font-serif')
 * @param {string} props.bgColor - 배경 색상 (Tailwind 클래스, 현재는 투명 처리됨)
 * @param {number} props.rotationDegree - 회전 각도 (상위 컴포넌트에서 계산)
 * @param {boolean} [props.alignTop=false] - 메세지 종류에 따른 정렬 방식
 * @param {string} [props.className] - 추가 클래스
 */

const MAX_PREVIEW_LENGTH = 75;
function Card({ 
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
        "w-full h-full rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden"; 
    
        
    //메세지 종류에 따른 정렬 방식 구분
    const textAlignmentStyle = alignTop
        ? { display: 'block', textAlign: 'left' } // ⭐️ 상단 정렬: Flexbox를 제거하고 block, 왼쪽 정렬만 사용 ⭐️
        : { display: 'flex', alignItems: 'center', justifyContent: 'center' }; // 중앙 정렬 (제목 미리보기)

    return (
        <div 
             className={`${baseStyle} bg-transparent ${className}`} 
            style={{ 
                transform: `rotate(${rotationDegree}deg)`,
                backgroundImage: `url('/memo.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', 
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

export default Card;