import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

import Header from "@/components/commons/bar/Header";
import SectionHeader from "@/components/commons/bar/SectionHeader";
import MoreButton from "@/components/commons/buttons/MoreButton";
import Chip from "@/components/commons/buttons/Chip";
import PopularCardList from "@/components/commons/card/PopularCardList";
import noCardImage from "@/assets/no-card-image.svg";

import memo1 from "@/assets/memo1.svg";
import memo2 from "@/assets/memo2.svg";
import memo3 from "@/assets/memo3.svg";
import memo4 from "@/assets/memo4.svg";
import memo5 from "@/assets/memo5.svg";
import memo6 from "@/assets/memo6.svg";

import { getPopularList } from "@/api/popular/getPopularList";

const FIXED_COUNT = 12;
const memoImages = [memo1, memo2, memo3, memo4, memo5, memo6];

function LandingPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const [popularCards, setPopularCards] = useState([]);

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

          <div className="flex justify-center items-center w-full h-full">
            <img
              src={noCardImage}
              alt="빈 롤링페이퍼 이미지"
              className="w-[193px] h-[193px] opacity-80"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
