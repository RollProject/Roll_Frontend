import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";

//testpage
import TestInputPage from "@/pages/TestInputPage"; 
import TestPageButton from "@/pages/TestPageButton"; 
import TestGridItem from "@/pages/TestGridItem"; 
import TestFullmsg from "@/pages/TestFullMsgBoard"; 


function App() {
  return (
    <Routes>
       <Route path="/" element={<LandingPage />}></Route> 

      {/* 컴포넌트 테스트 페이지 */}
      <Route path="/testinput" element={<TestInputPage />}></Route> 
      <Route path="/testButton" element={<TestPageButton />}></Route>
      <Route path="/testgrid" element={<TestGridItem />}></Route>
      <Route path="/testmsg" element={<TestFullmsg />}></Route>

      <Route path={routes.auth} element={<AuthPage />} />
            
            <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
