import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSuccess from "./pages/LoginSuccess";

function App() {
  const handleLogin = () => {
    // 프론트에서 백엔드 API 호출 → 카카오 로그인 시작
    window.location.href = "http://localhost:3000/auth/kakao/login";
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-6">Hello Roll!</h1>

        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500"
        >
          카카오 로그인
        </button>

        <Routes>
          <Route path="/login-success" element={<LoginSuccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
