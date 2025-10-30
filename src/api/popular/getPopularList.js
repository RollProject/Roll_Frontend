import axiosInstance from "../axiosInstance";

/**
 * 인기 리스트(보드 기준)를 받아 배열만 반환
 * @returns {Promise<Array>}
 */

export async function getPopularList() {
  try {
    const { data } = await axiosInstance.get("/popular");

    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("인기 리스트 불러오기 실패:", error);
    return [];
  }
}
