import { useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";

function Editbutton() {
  const navigate = useNavigate();

  const handleEditNavigate = () => {
    navigate("/edit");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <button
        onClick={handleEditNavigate}
        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-200 shadow-md hover:bg-gray-400 active:scale-95 transition"
      >
        <FiEdit3 size={26} className="text-black" />
      </button>
    </div>
  );
}

export default Editbutton;
