import React, { useState } from 'react';
// import '../styles/common/SearchBar.css'; // 필요하다면 스타일 파일 추가

const SearchBar = () => {
  // 1. 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState('');

  // 2. 검색어 입력 처리
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 3. 검색 버튼 클릭/제출 처리 (여기서 실제 검색 로직 수행)
  const handleSearch = (e) => {
    e.preventDefault(); // 폼 제출 방지 (필요하다면)
    
    if (searchTerm.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    
    // 실제 검색 로직: 
    // - API 호출을 통해 서버에서 데이터를 검색하거나,
    // - React Context/Redux를 사용하여 검색어(searchTerm)를 전역 상태에 저장하거나,
    // - props로 받은 검색 함수를 호출합니다.
    console.log('검색 실행:', searchTerm);
    
    // 검색 후 입력창 초기화 (선택 사항)
    // setSearchTerm('');
  };

  return (
    <form onSubmit={handleSearch} className="search-container">
      <input
        type="text"
        placeholder="키워드 검색"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit">
        🔍 {/* 검색 아이콘 */}
      </button>
    </form>
  );
};

export default SearchBar;