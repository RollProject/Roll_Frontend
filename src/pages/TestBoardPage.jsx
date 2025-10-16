import React, { useState, useEffect } from "react";

import WriteButton from "@/components/commons/buttons/WriteButton";
import FloatingMenu from "@/components/commons/buttons/FloatingButton";
import PageModal from "@/components/commons/modal/PageModal";
import Header from "@/components/commons/bar/Header";

const MainHeader = () => (
  // Header 컴포넌트 사용 제목과 좌우 아이콘을 설정
  <Header
    title="아직 이름이 없어요"
    leftContent={<span className="text-xl">&lt;</span>} // 뒤로가기 아이콘
    rightContent={<span className="text-xl">⋮⋮</span>} // 메뉴 아이콘
  />
);

// 플러스 버튼 드롭다운 메뉴 옵션 정의
const MENU_OPTIONS = [
  { label: "페이퍼 만들기", action: "create" },
  { label: "페이지 공유하기", action: "share" },
];

function TestBoardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // WriteButton  메뉴 상태를 토글
  const handleWriteButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSelect = (action) => {
    setIsMenuOpen(false); // 메뉴 닫기

    if (action === "create") {
      setIsModalOpen(true); //  '페이퍼 만들기' 선택 시 모달 열기
    } else if (action === "share") {
      alert("페이지 공유 기능 구현 예정");
    }
  };

  const handleModalComplete = () => {
    alert("롤링페이퍼 보드 생성 완료");
    setIsModalOpen(false); // 모달 닫기
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else if (!isModalOpen) {
      // 메뉴가 닫혔고 모달도 닫혔을 때만 스크롤 복원
      document.body.style.overflow = "unset";
    }

    // 클린업 함수: 컴포넌트가 사라질 때 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isModalOpen]);
  return (
    <div className="relative min-h-screen bg-gray-100">
      <MainHeader />

      {/* 2. 중앙 내용 컨테이너 */}
      <div className="max-w-xl mx-auto p-4 pt-16">
        {/* 롤링페이퍼 내용 */}
        <div className="h-[800px] border border-dashed border-gray-400 p-4 text-center text-gray-600">
          바로 아래에서 시작됩니다.
        </div>

        {/* 페이지 하단 콘텐츠 */}
      </div>

      {/* 3. 플로팅 메뉴 */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* FloatingMenu는 z-50 또는 z-51을 유지하여 WriteButton 위에 옵니다. */}
          <FloatingMenu
            options={MENU_OPTIONS}
            onSelect={handleMenuSelect}
            className="z-51"
          />
        </>
      )}

      {/* 2. WriteButton */}

      {!isMenuOpen && !isModalOpen && (
        <WriteButton onClick={handleWriteButtonClick} />
      )}

      {/*  3. PageModal */}
      <PageModal
        isOpen={isModalOpen}
        title="롤링페이퍼 보드 생성"
        onClose={() => setIsModalOpen(false)}
        onComplete={handleModalComplete}
      >
        {/* 모달 본문 내용 (Children) */}
        <div className="space-y-6">
          <p className="text-sm font-bold">To. [입력창]</p>

          <p className="text-sm font-bold">
            배경 화면을 선택해주세요. [ColorBox 그리드]
          </p>

          <p className="text-sm font-bold">커스텀 테마 적용하기</p>
        </div>
      </PageModal>
    </div>
  );
}

export default TestBoardPage;
