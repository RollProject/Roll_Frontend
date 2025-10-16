import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

function ProtectedRoute() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/session", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.isLoggedIn) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("세션 확인 실패:", err);
      }
    };
    checkSession();
  }, [setUser]);

  // 아직 세션 확인 전이면 렌더 중단
  if (user === null) return null;

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
