import Header from "@/components/commons/bar/NavHeader";

import noCardImage from "@/assets/no-card-image.svg";

import CardList from "@/components/commons/card/CardList";

import cards from "@/mock/cards/Card";

function BoardPage() {
  const myRollingPapers = [];
  const pageTitle = cards && cards.length > 0 ? cards[0].title : "롤링페이퍼";
  return (
    <div>
      <Header title={pageTitle} leftContent="back" rightContent="아이콘" />

      <div>
        <CardList cards={cards} />
      </div>

      <section className="flex flex-col gap-[70px] px-[25px] py-[25px]">
        <div className="flex flex-col gap-[30px]"></div>

        <div className="flex flex-col gap-[30px]">
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
            <div className="flex justify-center items-center w-full h-full py-8">
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

export default BoardPage;
