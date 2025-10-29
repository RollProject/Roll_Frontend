import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";
import BoardCreatePage from "@/pages/BoardCreatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path={routes.auth} element={<AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/board" element={<BoardCreatePage />} />
    </Routes>
  );
}

export default App;
