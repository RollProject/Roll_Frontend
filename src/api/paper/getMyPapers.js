import axiosInstance from "@/api/axiosInstance";
export async function getMyPapers() {
  try {
    const res = await axiosInstance.get("/board/me", {
      withCredentials: true, 
    });

    console.group("📄 getMyPapers() 응답");
    console.log("✅ 전체 응답:", res.data);
    if (res.data.success) {
      console.table(res.data.boards);
      return res.data.boards; 
    } else {
      console.warn("⚠️ 페이퍼 없음:", res.data.message);
      return [];
    }
  } catch (err) {
    console.error("❌ 내 페이퍼 불러오기 실패:", err);
    return [];
  } finally {
    console.groupEnd();
  }
}
