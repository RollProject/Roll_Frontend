import axiosInstance from "@/api/axiosInstance";

export async function createBoard(boardData) {
  console.log("➡️ API POST /board 실행 시도", boardData);
  const { data } = await axiosInstance.post("/board", boardData);

  return data;
}
