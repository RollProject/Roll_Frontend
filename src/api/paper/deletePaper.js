import axiosInstance from "@/api/axiosInstance";

export const deletePaper = async (paperId, userId) => {
  try {
    // DELETE 요청의 body에 userId를 담아 보냄
    const response = await axiosInstance.delete(`/paper/${paperId}`, {
      data: { RU_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 페이퍼 삭제 오류:", error);
    return {
      success: false,
      message: error.response?.data?.message || "삭제 실패",
    };
  }
};
