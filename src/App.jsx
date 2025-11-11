import { Routes, Route } from "react-router-dom";
import routes from "@/utils/constants/routes";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";
import EditPage from "@/pages/EditPage";
import BoardPage from "@/pages/BoardPage";
import Snowfall from "react-snowfall";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Snowfall
        color="white"
        radius={[2.0, 3.0]}
        snowflakeCount={100}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={routes.auth} element={<AuthPage />} />
          <Route path={routes.edit} element={<EditPage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
