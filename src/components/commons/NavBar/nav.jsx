// src/components/Nav.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/common/components/Nav.css"; 
import SearchBar from './SearchBar'; 
import { FaRegUserCircle } from "react-icons/fa"; 

const Nav = () => {
    const LOGO_SRC = "/Roll.png"; 

    return (
        <nav className="main-navbar">
            
            {/* 1. 왼쪽: 로고 (NavLink) */}
            <div className="nav-item logo-container">
                <NavLink to="/" className="logo-link">
                    <img 
                        src={LOGO_SRC} 
                        alt="서비스 로고" 
                        className="app-logo-image" 
                    />
                </NavLink>
            </div>
            
            {/* 2. 중앙: 검색창 */}
            <div className="nav-item search-container">
                <SearchBar /> 
            </div>
            
            {/* 3. 오른쪽: 마이페이지 아이콘 */}
            <div className="nav-item mypage-nav">
                <NavLink to="/mypage" className="nav-link">
                    <FaRegUserCircle size="24" className="mypage-icon" /> 
                    <span className="nav-text">MyPage</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Nav;