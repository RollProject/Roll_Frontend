import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

import Header from "@/components/commons/bar/Header";
import SectionHeader from "@/components/commons/bar/SectionHeader";
import MoreButton from "@/components/commons/buttons/MoreButton";
import Chip from "@/components/commons/buttons/Chip";
import CardList from "@/components/commons/card/CardList";
import PopularCardList from "@/components/commons/card/PopularCardList";
import noCardImage from "@/assets/no-card-image.svg";

import memo1 from "@/assets/memo1.svg";
import memo2 from "@/assets/memo2.svg";
import memo3 from "@/assets/memo3.svg";
import memo4 from "@/assets/memo4.svg";
import memo5 from "@/assets/memo5.svg";
import memo6 from "@/assets/memo6.svg";
import FloatingMenu from "@/components/commons/buttons/FloatingButton";
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

  const handleWriteButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSelect = (action) => {
    setIsMenuOpen(false);

    if (action === "create") {
      setIsModalOpen(true);
    } else if (action === "share") {
      alert("페이지 공유 기능 구현 예정");
    }
  };

  const handleModalComplete = () => {
    alert("롤링페이퍼 보드 생성 완료");
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else if (!isModalOpen) {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isModalOpen]);

  useEffect(() => {
    async function fetchMyPapers() {
      const papers = await getMyPapers();
      console.log("📦 내 페이퍼 목록:", papers);
      setMyPapers(papers); // ✅ state 업데이트
    }
    fetchMyPapers();
  }, []);

  const handleClick = (paper) => {
    const id = paper.RB_id;

    if (typeof id === "number") {
      navigate(`/board/${id}`);
    }
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include", // ✅ 쿠키 세션 포함
        });

        const data = await res.json();
        console.log("🧠 /auth/me 응답:", data);

        if (data.success) {
          // ✅ Zustand 전역 상태 업데이트
          setUser({
            id: data.data.RU_id ?? data.data.kakao_id,
            nickname: data.data.nickname,
            profile_image: data.data.profile_image,
            kakao_id: data.data.kakao_id,
          });
        } else {
          console.warn("세션 만료:", data.message);
          navigate("/auth"); // 로그인 페이지로 이동
        }
      } catch (err) {
        console.error("❌ 세션 확인 중 오류:", err);
        navigate("/auth");
      }
    };

    fetchUserInfo();
  }, [setUser, navigate]);
  useEffect(() => {
    async function fetchPopular() {
      const list = await getPopularList();
      const mapped = (list ?? []).map((b, i) => ({
        id: b.RB_id,
        text: b.RB_title,
        image: memoImages[i % memoImages.length],
      }));

      const filled = [...mapped];
      while (filled.length < FIXED_COUNT) {
        filled.push({
          id: `dummy-${filled.length + 1}`,
          text: "",
          image: memoImages[filled.length % memoImages.length],
        });
      }

      setPopularCards(filled.slice(0, FIXED_COUNT));
    }
    fetchPopular();
  }, []);

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

        if (data.sessionData?.kakaoUser) {
          setUser(data.sessionData.kakaoUser);
        } else {
          navigate("/auth");
        }
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

  return (
    <div>
      <Header leftContent="로고" rightContent={user.nickname || "아이콘"} />

      <section className="flex flex-col gap-[70px] px-[15px] py-[15px]">
        <div className="flex flex-col gap-[30px]">
          <SectionHeader title="인기 롤링페이퍼">
            <MoreButton label="더보기" onClick={() => navigate("/popular")} />
          </SectionHeader>

          <PopularCardList cards={popularCards} />
        </div>

        <div className="flex flex-col gap-[30px]">
          <SectionHeader title="내 롤링페이퍼">
            <Chip label="페이퍼 만들기" onClick={() => navigate("/edit")} />
          </SectionHeader>

          {myPapers.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {myPapers.map((paper) => (
                <div
                  key={paper.RB_id}
                  onClick={() => handleClick(paper)}
                  className={`rounded-2xl shadow-md p-4 text-center ${paper.RB_bgcolor}`}
                >
                  <p className="font-bold text-gray-800">{paper.RB_title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(paper.RB_datetime).toLocaleDateString()}
                  </p>
                </div>
              ))}
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
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-40 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <FloatingMenu
                options={MENU_OPTIONS}
                onSelect={handleMenuSelect}
                className="z-51"
              />
            </>
          )}

          {!isMenuOpen && !isModalOpen && (
            <WriteButton onClick={handleWriteButtonClick} />
          )}
          <PageModal
            isOpen={isModalOpen}
            title="롤링페이퍼 작성하기"
            onClose={() => setIsModalOpen(false)}
            onComplete={handleModalComplete}
          />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
