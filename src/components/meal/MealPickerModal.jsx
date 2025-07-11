import { useState } from "react";

function MealPickerModal() {
  const [selectedMeal, setSelectedMeal] = useState("");
  const [open, setOpen] = useState(false);

  const meals = ["아침", "점심", "저녁", "간식"];

  const handleConfirm = () => {
    if (!selectedMeal) return alert("식사 타입을 선택하세요.");
    console.log("선택한 식사 타입:", selectedMeal);
    setOpen(false);
  };

  return (
    <div>
      <button
        className="btn btn-primary rounded-full bg-purple-500 text-lg border-none w-12 h-12 flex items-center justify-center"
        onClick={() => setOpen(true)}
      >
        +
      </button>

      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <div className="flex flex-col gap-2">
              {meals.map((meal) => (
                <button
                  key={meal}
                  className={`btn btn-ghost border-none ${
                    selectedMeal === meal ? "text-purple-500 font-bold" : ""
                  }`}
                  onClick={() => setSelectedMeal(meal)}
                >
                  {meal}
                </button>
              ))}
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>
                취소
              </button>
              <button
                className="btn bg-purple-500 text-white"
                onClick={handleConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
export default MealPickerModal;
