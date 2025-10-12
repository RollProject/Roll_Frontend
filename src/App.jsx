import routes from "@/utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ErrorPage from "@/pages/ErrorPage";

//testpage
import TestInputPage from "@/pages/TestInputPage"; 
import TestPageButton from "@/pages/TestPageButton"; 
import TestBoardButton from "@/pages/TestBoardPage"; 
import TestGridItem from "@/pages/TestGridItem"; 
import TestFullmsg from "@/pages/TestFullMsgBoard"; 

function App() {
  return (
    <Routes>
       <Route path="/" element={<LandingPage />}></Route> 

      {/* 입력 칸 종합 테스트 페이지 */}
      <Route path="/testinput" element={<TestInputPage />}></Route> 
      {/* 버튼 종합 테스트 페이지 */}
      <Route path="/testButton" element={<TestPageButton />}></Route>
      {/* 모달, 플러스 버튼 테스트 페이지 */}
      <Route path="/testboard" element={<TestBoardButton />}></Route>
      {/* 롤링페이퍼 제목 목록 테스트 페이지 */}
      <Route path="/testgrid" element={<TestGridItem />}></Route>
      {/* 롤링페이터 내용 목록 테스트 페이지 */}
      <Route path="/testmsg" element={<TestFullmsg />}></Route>

      <Route path={routes.auth} element={<AuthPage />} />
            
            <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
