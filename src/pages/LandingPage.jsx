import Header from "@/components/commons/bar/Header";
import SectionHeader from "@/components/commons/bar/SectionHeader";
import MoreButton from "@/components/commons/buttons/MoreButton";
import Chip from "@/components/commons/buttons/Chip";
import noCardImage from "@/assets/no-card-image.svg";
import PopularCardList from "@/components/commons/card/PopularCardList";
import { useNavigate } from "react-router-dom";

import cards from "@/mock/cards/popularCards";

function LandingPage() {
  const navigate = useNavigate();
  const myRollingPapers = [];

  return (
    <div>
      <Header leftContent="로고" rightContent="아이콘" />
   
      <section className="flex flex-col gap-[70px] px-[15px] py-[15px]">
        <div className="flex flex-col gap-[30px] ">
          <SectionHeader title="인기 롤링페이퍼">
            <MoreButton label="더보기" onClick={() => navigate("/popular")} />
          </SectionHeader>
          <div className="">
            <PopularCardList cards={cards} />
          </div>
        </div>

        <div className="flex flex-col gap-[30px]">
          <SectionHeader title="내 롤링페이퍼">
            <Chip label="페이퍼 만들기" onClick={() => navigate("/board")} />
          </SectionHeader>

          {myRollingPapers.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg h-[120px] flex items-center justify-center">
                내용
              </div>
              <div className="bg-gray-100 rounded-lg h-[120px] flex items-center justify-center">
                내용
              </div>
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
      </section>
    </div>
  );
}

export default LandingPage;
