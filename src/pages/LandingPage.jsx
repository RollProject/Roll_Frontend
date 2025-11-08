import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

import Header from "@/components/commons/bar/Header";
import PopularCardList from "@/components/commons/card/PopularCardList";
import noCardImage from "@/assets/no-card-image.svg";

import memo1 from "@/assets/bigMemo/memo1.svg";
import memo2 from "@/assets/bigMemo/memo2.svg";
import memo3 from "@/assets/bigMemo/memo3.svg";
import memo4 from "@/assets/bigMemo/memo4.svg";
import memo5 from "@/assets/bigMemo/memo5.svg";
import memo6 from "@/assets/bigMemo/memo6.svg";
import Editbutton from "@/components/commons/buttons/EditButton";
import PageModal from "@/components/commons/modal/PageModal";
import WriteButton from "@/components/commons/buttons/WriteButton";
import { getPopularList } from "@/api/popular/getPopularList";
import { getMyPapers } from "@/api/paper/getMyPapers";

const FIXED_COUNT = 12;
const memoImages = [memo1, memo2, memo3, memo4, memo5, memo6];
const MENU_OPTIONS = [
  { label: "페이퍼 만들기", action: "create" },
  { label: "페이지 공유하기", action: "share" },
];

function LandingPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const [popularCards, setPopularCards] = useState([]);
  const [myPapers, setMyPapers] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("popular"); // ✅ 현재 탭 상태

  // ✅ 플로팅 메뉴 상태 제어
  const handleWriteButtonClick = () => setIsMenuOpen(!isMenuOpen);

  const handleModalComplete = () => {
    alert("롤링페이퍼 보드 생성 완료");
    setIsModalOpen(false);
  };

  // ✅ body 스크롤 제어
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else if (!isModalOpen) document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isModalOpen]);

  // ✅ 내 롤링페이퍼 가져오기
  useEffect(() => {
    async function fetchMyPapers() {
      const papers = await getMyPapers();
      console.log("📦 내 페이퍼 목록:", papers);
      setMyPapers(papers);
    }
    fetchMyPapers();
  }, []);

  const handleClick = (paper) => {
    const id = paper.RB_id;
    if (typeof id === "number") navigate(`/board/${id}`);
  };

  // ✅ 유저 세션 확인 (/me)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("🧠 /auth/me 응답:", data);

        if (data.success) {
          setUser({
            id: data.data.RU_id ?? data.data.kakao_id,
            nickname: data.data.nickname,
            profile_image: data.data.profile_image,
            kakao_id: data.data.kakao_id,
          });
        } else {
          console.warn("세션 만료:", data.message);
          navigate("/auth");
        }
      } catch (err) {
        console.error("❌ 세션 확인 중 오류:", err);
        navigate("/auth");
      }
    };
    fetchUserInfo();
  }, [setUser, navigate]);

  // ✅ 인기 롤링페이퍼 가져오기
  useEffect(() => {
    async function fetchPopular() {
      const list = await getPopularList();
      console.log("🔥 인기 롤링페이퍼 목록:", list);

      const mapped = (list ?? []).map((b, i) => ({
        id: b.RB_id,
        text: b.RB_title,
        image: memoImages[i % memoImages.length],
        participants: b.paper_count || 0,
      }));

      const filled = [...mapped];
      while (filled.length < FIXED_COUNT) {
        filled.push({
          id: `dummy-${filled.length + 1}`,
          text: "",
          image: memoImages[filled.length % memoImages.length],
          participants: 0,
        });
      }
      setPopularCards(filled.slice(0, FIXED_COUNT));
    }
    fetchPopular();
  }, []);

  // ✅ 세션 재확인 (/session-info)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/session/session-info", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("세션 정보 요청 실패");
        const data = await res.json();

        console.log("🟢 세션 응답 전체:", data);
        console.log("👤 사용자 정보:", data.sessionData?.kakaoUser);

        if (data.sessionData?.kakaoUser) setUser(data.sessionData.kakaoUser);
        else navigate("/auth");
      } catch (err) {
        console.error("세션 확인 실패:", err);
        navigate("/auth");
      }
    };
    checkSession();
  }, [setUser, navigate]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        세션 확인 중...
      </div>
    );

  // ✅ 렌더링 시작
  return (
    <div className="bg-black min-h-screen text-white">
      <Header leftContent="로고" rightContent={user.nickname || "아이콘"} />
      {/* 상단 탭 영역 */}
      <div className="sticky top-[65px] z-50 bg-black flex w-full justify-between items-center px-[15px] mb-1 text-lg pb-3 border-gray-800">
        <button
          onClick={() => setActiveTab("popular")}
          className={`transition-all duration-300 ${
            activeTab === "popular"
              ? "text-white scale-105"
              : "text-gray-500 opacity-60 hover:opacity-100"
          }`}
        >
          인기 롤링페이퍼
        </button>

        <button
          onClick={() => setActiveTab("mypaper")}
          className={`transition-all duration-300 ${
            activeTab === "mypaper"
              ? "text-white scale-105"
              : "text-gray-500 opacity-60 hover:opacity-100"
          }`}
        >
          내 롤링페이퍼
        </button>
      </div>

      {/* 탭별 콘텐츠 */}
      <section className="flex flex-col gap-[70px] px-[13px] py-[13px]">
        {activeTab === "popular" ? (
          <div className="flex flex-col gap-[30px]">
            <PopularCardList cards={popularCards} />
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            {myPapers.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-1 gap-y-6 justify-items-center">
                {myPapers.map((paper) => {
                  const rotation = Math.random() * 6 - 3; // -3~3도 사이 랜덤 회전
                  const offsetX = Math.random() * 6 - 3;
                  const offsetY = Math.random() * 6 - 3;

                  return (
                    <div
                      key={paper.RB_id}
                      onClick={() => handleClick(paper)}
                      className={`relative w-[170px] h-[190px] rounded-2xl cursor-pointer 
              flex flex-col justify-between p-5 transition-all duration-300 
              hover:scale-[1.05] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]
              ${
                paper.RB_bgcolor
                  ? paper.RB_bgcolor
                  : "bg-gradient-to-br from-gray-50 to-gray-100"
              } shadow-[0_2px_10px_rgba(0,0,0,0.08)]`}
                      style={{
                        transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
                      }}
                    >
                      {/* 상단 핀 포인트 */}
                      <div className="absolute top-3 left-3 w-[7px] h-[7px] bg-black rounded-full" />

                      {/* 카드 제목 */}
                      <div className="flex-1 flex items-center justify-center text-center px-2">
                        <p className="text-[15px] font-semibold leading-snug text-gray-800 break-keep">
                          {paper.RB_title}
                        </p>
                      </div>

                      {/* 하단 날짜 + 참여자 수 */}
                      <div className="flex flex-col items-center text-gray-500 text-[12px] mt-1 select-none">
                        <p>
                          {new Date(paper.RB_datetime).toLocaleDateString()}
                        </p>
                        <div className="mt-1 px-3 py-[3px] bg-gray-900 text-white text-[11px] font-medium rounded-full shadow-sm">
                          {paper.participant_count ?? 0}명 참여
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <img
                  src={noCardImage}
                  alt="빈 롤링페이퍼 이미지"
                  className="w-[193px] h-[193px] opacity-80"
                />
              </div>
            )}
          </div>
        )}
      </section>
      {!isMenuOpen && !isModalOpen && (
        <Editbutton onClick={handleWriteButtonClick} />
      )}

      <PageModal
        isOpen={isModalOpen}
        title="롤링페이퍼 작성하기"
        onClose={() => setIsModalOpen(false)}
        onComplete={handleModalComplete}
      />
    </div>
  );
}

export default LandingPage;
