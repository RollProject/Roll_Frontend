import axiosInstance from "@/api/axiosInstance";

export async function deleteBoard(boardId) {
  try {
    const { data } = await axiosInstance.delete(`/board/${boardId}`);
    return data;
  } catch (error) {
    console.error("❌ 보드 삭제 API 오류:", error.response || error);
    return {
      success: false,
      message:
        error.response?.data?.message || "서버 오류로 삭제에 실패했습니다.",
    };
  }
}
