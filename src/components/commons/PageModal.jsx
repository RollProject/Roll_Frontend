import React from 'react';

/**
 * 페이지 상단에서 내려오는 모달/팝업 시트 형태의 공통 컴포넌트입니다.
 * (롤링페이퍼 생성, 설정 변경 등 주요 작업에 사용)
 *
 * @param {object} props - 컴포넌트 props
 * @param {boolean} props.isOpen - 모달 표시/숨김 여부 (필수)
 * @param {string} props.title - 모달 헤더 중앙에 표시될 제목 (필수)
 * @param {function} props.onClose - 모달 닫기 버튼 클릭 시 실행될 핸들러
 * @param {function} props.onComplete - 모달 내 '완료' 버튼 클릭 시 실행될 핸들러
 * @param {React.ReactNode} props.children - 모달 본문에 들어갈 내용 (배경 선택, 입력 폼 등)
 */


function PageModal({ isOpen, title, onClose, onComplete, children }) {
    if (!isOpen) return null;

    // 오른쪽 '완료' 버튼 
    const CompleteButton = () => (
        <button 
            onClick={onComplete} 
            className="text-base font-bold text-black px-2 py-1"
        >
            완료
        </button>
    );
    
    //왼쪽 '닫기' 버튼
    const CloseButton = () => (
        <button 
            onClick={onClose} 
            className="text-base font-medium text-gray-700 px-2 py-1"
        >
            닫기
        </button>
    );

    return (
        <div className="fixed inset-0 z-50"> 
            {/* 1. 딤머 배경 */}
            <div 
                className="fixed inset-0 z-40" 
                onClick={onClose} 
                style={{ backgroundColor: 'rgba(96, 95, 95, 0.7)' }} // #605F5F
            />

            {/* 2. 모달 내용 컨테이너 */}
           <div 
                className="fixed top-16 left-0 right-0 w-full max-w-xl mx-auto 
                           bottom-0 bg-white shadow-2xl z-50 overflow-y-auto 
                           rounded-t-3xl"
            >
                
                {/* 모달 내부 헤더  */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    {/* 닫기 버튼 */}
                    <CloseButton /> 
                    {/* 중앙 제목 */}
                    <h2 className="text-lg font-bold truncate">롤링페이퍼 보드 생성</h2> 
                    {/* 완료 버튼 */}
                    <CompleteButton />
                </div>
                
                {/* 3. 모달 본문 (children) */}
                <div className="p-4 pb-20"> 
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PageModal;