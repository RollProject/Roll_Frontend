import React, { useState } from 'react';
import ThemeSelector from '@/components/commons/buttons/ThemeSelector';

const THEMES = [
    { id: 'snow', name: '눈 테마 적용하기', image: '/snow.svg' },
    { id: 'rainbow', name: '무지개 테마 적용하기', image: '/rainbow.svg' },
    // ... 기타 테마
];

function ThemeSelectionPage() {
    const [activeTheme, setActiveTheme] = useState('snow'); // 현재 선택된 테마 ID

    return (
        <div className="p-6 space-y-4">
            <p className="text-lg font-bold">커스텀 테마 적용하기</p>
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
    );
}

export default ThemeSelectionPage;