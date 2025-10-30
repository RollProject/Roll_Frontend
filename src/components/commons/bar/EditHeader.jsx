import React from "react";
import { useNavigate } from "react-router-dom";
function EditHeader({ title, onComplete }) {
  const navigate = useNavigate();

  const CancelButton = () => (
    <button
      onClick={() => navigate(-1)}
      className="text-base font-medium text-gray-700 px-2 py-1"
    >
      취소
    </button>
  );

  const CompleteButton = () => (
    <button onClick={onComplete} className="text-base text-black px-2 py-1">
      완료
    </button>
  );

  return (
    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
      <div className="w-1/4 flex justify-start">
        <CancelButton />
      </div>

      <h2 className="flex-1 text-center text-lg truncate">{title}</h2>

      <div className="w-1/4 flex justify-end">
        <CompleteButton />
      </div>
    </div>
  );
}

export default EditHeader;
