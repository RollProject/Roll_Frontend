import axiosInstance from "@/api/axiosInstance";

/**
 * 새 페이퍼(메모)를 생성합니다.
 * @param {object} paperData - { boardId, kakao_id, content, font, color, align }
 * @returns {object} API 응답 객체
 */
export async function createPaper(paperData) {
  try {
    const { data } = await axiosInstance.post("/paper", paperData);

    console.log("➡️ API POST /paper 응답:", data);
    return data;
  } catch (error) {
    console.error("❌ 페이퍼 생성 API 오류:", error.response || error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "서버 오류로 페이퍼 작성에 실패했습니다.",
    };
  }
}
