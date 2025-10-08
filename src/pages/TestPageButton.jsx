import React, { useState } from 'react';
import ColorBox from '@/components/commons/buttons/ColorBox.jsx'; 
const TestColors = () => {
    // 선택된 색상 상태를 관리합니다. (초기값은 파란색)
    const [selectedColor, setSelectedColor] = useState('bg-blue-300');

    // 테스트할 색상 목록 (Tailwind 클래스 사용)
    const colors = [
        'bg-blue-200',    
        'bg-purple-300',  
        'bg-gray-100',    
        'bg-pink-200',    
        'bg-green-300',   
        'bg-lime-200',    
        'bg-orange-200',  
        'bg-white'        
    ];

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8 bg-white shadow-xl mt-10">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
                공통 컴포넌트 테스트 화면 (ColorBox)
            </h1>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">1. 배경 색상 선택</h2>
                
                {/* 색상 상자 렌더링 영역 */}
                <div className="flex flex-wrap gap-4 p-4 border border-gray-200 rounded-lg justify-start">
                    {colors.map((c) => (
                        <ColorBox
                            key={c}
                            color={c} // 배경색 클래스 전달
                            isSelected={selectedColor === c} // 현재 선택 여부
                            onClick={() => setSelectedColor(c)} // 클릭 시 상태 업데이트
                        />
                    ))}
                </div>
                <p className="text-sm text-gray-600">
                    현재 선택된 색상: <span className="font-mono font-bold">{selectedColor}</span>
                </p>
            </section>
        </div>
    );
};

export default TestColors;