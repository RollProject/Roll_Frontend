import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";
import ProtectedRoute from "@/routes/ProtectedRoutes.jsx";

import BoardPage from "./pages/BoardPage";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<LandingPage />}></Route>
      </Route>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/Board" element={<BoardPage />}></Route>
      <Route path={routes.auth} element={<AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
