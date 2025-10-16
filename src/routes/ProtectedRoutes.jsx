import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

function ProtectedRoute() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/session/session-info", {
          credentials: "include",
        });

        const data = await res.json();
        console.log("✅ 세션 정보:", data);

        // ✅ kakaoUser가 있을 때만 상태 저장
        if (data.sessionData?.kakaoUser) {
          setUser(data.sessionData.kakaoUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("❌ 세션 확인 실패:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setUser]);

  // ✅ 세션 확인 중이면 잠깐 로딩 표시
  if (loading) return <div>로딩 중...</div>;

  // ✅ 로그인 안 되어 있으면 AuthPage로 리다이렉트
  if (!user) return <Navigate to="/auth" replace />;

  // ✅ 세션 있고 user 세팅된 경우에만 메인 렌더링
  return <Outlet />;
}

export default ProtectedRoute;
