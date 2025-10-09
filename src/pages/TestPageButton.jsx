import React, { useState } from 'react';
import ColorBox from '@/components/commons/buttons/ColorBox.jsx'; 
import ThemeSelector from '@/components/commons/buttons/ThemeSelector';


const TestColors = () => {
    // 선택된 색상 상태를 관리합니다. (초기값은 파란색)
    const [selectedColor, setSelectedColor] = useState('bg-blue-300');

    // 테스트할 색상 목록 (Tailwind)
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
const THEMES = [
    // public 폴더 직속 이미지 경로라고 가정합니다.
    { id: 'snow', name: '눈 테마 적용하기', image: '/snow.svg' },
    { id: 'rainbow', name: '무지개 테마 적용하기', image: '/rainbow.svg' },
];

const TestThemes = () => {
    const [activeTheme, setActiveTheme] = useState('snow'); // 현재 선택된 테마 ID

    return (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. 커스텀 테마 적용하기 (ThemeSelector)</h2>
            <div className="space-y-3">
                {THEMES.map((theme) => (
                    <ThemeSelector
                        key={theme.id}
                        themeName={theme.name}
                        imageUrl={theme.image}
                        isSelected={activeTheme === theme.id} // ID 일치 여부로 선택 상태 결정
                        onClick={() => setActiveTheme(theme.id)} // 클릭 시 상태 업데이트
                    />
                ))}
            </div>
        </div>
    );
};

function TestPageButton() {
    return (
        <div className="p-8 max-w-xl mx-auto space-y-8 bg-white shadow-xl mt-10">
            <h1 className="text-2xl font-bold text-center text-gray-800 border-b pb-3">
                공통 컴포넌트 통합 테스트
            </h1>
            
            {/* 개별 테스트 컴포넌트 렌더링 */}
            <TestColors />
            <TestThemes />

            {/* 참고: 이전에 만든 TextInput 테스트 페이지의 내용을 여기에 추가할 수도 있습니다. */}
        </div>
    );
}
export default TestPageButton;