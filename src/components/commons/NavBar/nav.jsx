// src/components/Nav.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from './SearchBar'; 
import { FaRegUserCircle } from "react-icons/fa"; 

const Nav = () => {
    const LOGO_SRC = "/Roll.png"; 

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-white p-4 shadow-md z-50">
            
            <div className="flex-shrink-0">
                <NavLink to="/" className="flex items-center space-x-2">
                    <img 
                        src={LOGO_SRC} 
                        alt="서비스 로고" 
                        className="h-8 w-auto"
                    />
                </NavLink>
            </div>
            
            <div className="flex-grow flex justify-center px-8">
                <SearchBar /> 
            </div>
            
            <div className="flex-shrink-0">
                <NavLink to="/mypage" className="flex flex-col items-center text-black text-xs space-y-0.5">
                    <FaRegUserCircle size="24" /> 
                    <span>MyPage</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Nav;