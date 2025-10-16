import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

import Header from "@/components/commons/bar/Header";
import SectionHeader from "@/components/commons/bar/SectionHeader";
import MoreButton from "@/components/commons/buttons/MoreButton";
import Chip from "@/components/commons/buttons/Chip";
import PopularCardList from "@/components/commons/card/PopularCardList";
import noCardImage from "@/assets/no-card-image.svg";
import cards from "@/mock/cards/popularCards";

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/session", {
          credentials: "include", // ✅ 세션 쿠키 포함 (필수)
        });
        const data = await res.json();
        console.log("📦 백엔드 세션 데이터:", data);
      } catch (err) {
        console.error("❌ 세션 확인 실패:", err);
      }
    };

    checkSession();
  }, []);

  if (!user) return null; // 세션 확인 전엔 렌더 X

  return (
    <div>
      <Header leftContent="로고" rightContent={user.nickname || "아이콘"} />

      <section className="flex flex-col gap-[70px] px-[15px] py-[15px]">
        <div className="flex flex-col gap-[30px] ">
          <SectionHeader title="인기 롤링페이퍼">
            <MoreButton label="더보기" onClick={() => navigate("/popular")} />
          </SectionHeader>
          <PopularCardList cards={cards} />
        </div>

        <div className="flex flex-col gap-[30px]">
          <SectionHeader title="내 롤링페이퍼">
            <Chip label="페이퍼 만들기" onClick={() => navigate("/board")} />
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
