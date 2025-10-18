import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import TestBoardPage from "@/pages/TestBoardPage";
import ErrorPage from "@/pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path={routes.auth} element={<AuthPage />} />
      <Route path={routes.board} element={<TestBoardPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
