import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";
import EditPage from "@/pages/EditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path={routes.auth} element={<AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path={routes.edit} element={<EditPage />} />
    </Routes>
  );
}

export default App;
