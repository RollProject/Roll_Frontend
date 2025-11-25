import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

function ProtectedRoute() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  // 🔥 여기에 하드코딩된 백엔드 URL 추가
  const API_URL = "https://roll-backend.onrender.com";

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/session/session-info`, {
          credentials: "include",
        });

        const data = await res.json();
        console.log("✅ 세션 정보:", data);

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

  if (loading) return <div>로딩 중...</div>;

  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
