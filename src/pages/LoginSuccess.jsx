import { useEffect, useState } from "react";
import axios from "axios";

function LoginSuccess() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/kakao/user")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("❌ 유저 정보 불러오기 실패:", err);
      });
  }, []);

  if (!user) return <p className="text-lg">⏳ 로그인 정보 불러오는 중...</p>;

  const profile = user.kakao_account?.profile;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">로그인 성공 🎉</h2>

      <p className="mb-2">🆔 ID: {user.id}</p>
      <p className="mb-2">👤 닉네임: {profile?.nickname}</p>

      {profile?.profile_image_url && (
        <img
          src={profile.profile_image_url}
          alt="프로필"
          className="w-20 h-20 rounded-full shadow-md"
        />
      )}
    </div>
  );
}

export default LoginSuccess;
