import axiosInstance from "@/api/axiosInstance";

export async function createPaper(paperData) {
  console.log("🔍 [createPaper] 요청 데이터:", paperData);

  try {
    const formData = new FormData();

    formData.append("boardId", paperData.boardId);
    formData.append("kakao_id", paperData.kakao_id);
    formData.append("content", paperData.content || "");
    formData.append("font", paperData.font || "Pretendard");
    formData.append("color", paperData.color || "#FFFFFF");
    formData.append("align", paperData.align || "left");
    formData.append("textColor", paperData.textColor || "#000000");

    if (paperData.file) {
      formData.append("bgImage", paperData.file);
    }

    const { data } = await axiosInstance.post("/paper", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });

    console.log("➡️ 성공 응답:", data);
    return data;
  } catch (error) {
    console.error("❌ 오류 상세:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "서버 오류 발생",
    };
  }
}
