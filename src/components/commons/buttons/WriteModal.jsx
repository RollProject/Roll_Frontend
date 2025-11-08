function WriteModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-3">작성하기</h2>
        <textarea
          placeholder="내용을 입력하세요..."
          className="w-full h-32 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            닫기
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default WriteModal;
