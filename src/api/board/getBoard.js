import axiosInstance from "@/api/axiosInstance";

export async function getBoard(id) {
  try {
    const { data } = await axiosInstance.get(`/board/${id}`);

    console.log("📦 [getBoard 응답 전체]:", data);

    // ✅ 백엔드 구조에 맞게 수정
    if (data?.success && data.board) {
      console.log("🎯 프론트에서 받은 board:", data.board);
      console.log("🧾 연결된 papers:", data.papers);
      return { board: data.board, papers: data.papers };
    } else {
      console.warn("⚠️ 보드 데이터가 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("❌ 보드 불러오기 실패:", error);
    return null;
  }
}
