function DecorateModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-3">꾸미기</h2>
        <p className="text-gray-600 text-sm">
          (스티커 넣기 기능은 이후 추가 예정)
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DecorateModal;
