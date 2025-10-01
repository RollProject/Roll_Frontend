import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path={routes.auth} element={<AuthPage />}></Route>
      <Route path={routes.home} element={<LandingPage />}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
