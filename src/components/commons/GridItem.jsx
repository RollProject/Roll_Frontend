import React, { useMemo } from 'react';
import RotatedMemoCard from './Inputs/RotatedMemoCard'; 

/**
 * 롤링페이퍼 목록 그리드 항목 컴포넌트입니다.
 * (메인 화면 미리보기 또는 상세 목록 뷰에 사용)
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.title - 롤링페이퍼의 제목 (메인 뷰 사용)
 * @param {string} [props.content] - 상세 뷰에서 표시할 메시지 내용
 * @param {string} [props.fontStyle] - 적용할 글꼴 스타일
 * @param {string} props.themeStyle - 배경 색상/테마 (Tailwind 클래스)
 * @param {boolean} [props.isFullView=false] - 상세 메시지 뷰 여부 (true: RotatedMemoCard 사용)
 * @param {function} [props.onClick] - 항목 클릭 이벤트 핸들러
 */
function GridItem({ 
    title, 
    content,       
    fontStyle,     
    themeStyle, 
    isFullView = false, // false: 메인 미리보기, true: 상세 메시지 뷰
    onClick, 
    ...rest 
}) {
    
    const rotationDegree = useMemo(() => {
        return Math.floor(Math.random() * 11) - 5; // -5도에서 5도 사이
    }, []); 

    //  isFullView (상세 메시지 뷰)일 때는 RotatedMemoCard를 렌더링 
    if (isFullView) {
        return (
             <RotatedMemoCard 
            content={content || title} 
            fontStyle={fontStyle || 'font-sans'}
            bgColor={themeStyle || 'bg-yellow-100'}
            rotationDegree={rotationDegree}
            alignTop={true} // 수정: 메시지 내용은 상단 정렬
            className="m-2"
            onClick={onClick}
            {...rest}
        />
        );
    }

    //  isFullView가 아닐 때 (메인 미리보기) 로직 
    const simpleCardStyle = 
        "w-48 h-48 rounded-lg flex justify-center items-center p-4 text-center text-base font-bold cursor-pointer";
    
   return (
        <div 
            className={`${simpleCardStyle} hover:shadow-lg transition-shadow`}
            onClick={onClick}
            {...rest}
            style={{
                backgroundImage: `url('/memo.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%', 
                backgroundPosition: 'center',
                transform: `rotate(${rotationDegree}deg)`,
                backgroundColor: 'transparent', 
            }}
        >
            <p className="text-gray-900 font-bold line-clamp-2">{title}</p>
        </div>
    );
}

export default GridItem;