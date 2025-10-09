import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";

//testpage
import TestInputPage from "@/pages/TestInputPage"; 
import TestPageButton from "@/pages/TestPageButton"; 



function App() {
  return (
    <Routes>
       <Route path="/" element={<LandingPage />}></Route> 

      <Route path="/testinput" element={<TestInputPage />}></Route> 
      <Route path="/testButton" element={<TestPageButton />}></Route>
      

      <Route path={routes.auth} element={<AuthPage />} />
            {/* routes.home은 '/'이므로 index 라우트로 대체되어 제거하는 것이 좋습니다. */}
            {/* <Route path={routes.home} element={<LandingPage />}></Route> */}
            
            <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
