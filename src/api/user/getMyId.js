import axiosInstance from "../axiosInstance";

export async function getMyId() {
  try {
    const { data } = await axiosInstance.get("/user/my-id", {
      withCredentials: true, 
    });

    if (data.success) {
      console.log("🎯 내 ID:", data.RU_id);
      return data;
    } else {
      console.warn("⚠️ 사용자 정보 없음:", data.message);
      return null;
    }
  } catch (err) {
    console.error("❌ getMyId 실패:", err);
    return null;
  }
}
