import BasicButton from "@/components/commons/buttons/BasicButton";

function AuthPage() {
  const handleLogin = () => {
    // 백엔드로 이동 (리디렉션)
    window.location.href = "http://localhost:3000/auth/kakao/login";
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[200px] bg-white px-[23px] gap-[75px]">
      <div className="flex flex-col gap-[24px] items-center">
        <div className="flex flex-col items-start gap-[2px]">
          <p className="font-inter text-2xl leading-[36px] tracking-[-0.01em]">
            <span className="text-[#727272]">롤링페이퍼</span>로
          </p>
          <p className="font-inter text-2xl leading-[36px] tracking-[-0.01em]">
            따뜻한 한마디를 전해보세요.
          </p>
        </div>
        <img
          src="/auth_main_image.svg"
          alt="메인 일러스트"
          width={300}
          height={314}
          className="mx-auto"
        />
      </div>

      <div className="w-[302px] h-[51px]">
        <BasicButton children="카카오 로그인하기" onClick={handleLogin} />
      </div>
    </div>
  );
}

export default AuthPage;
