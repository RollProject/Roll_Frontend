function Home() {
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:3000/auth/kakao/login";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleKakaoLogin}
        className="px-6 py-3 rounded-lg bg-yellow-300 hover:bg-yellow-400 text-black font-bold"
      >
        카카오로 로그인하기
      </button>
    </div>
  );
}

export default Home;
