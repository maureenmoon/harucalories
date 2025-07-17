import { useEffect, useState } from "react";
import MealPickerModal from "../../components/meal/MealPickerModal";
import { Link, useNavigate } from "react-router-dom";

const calorieGoal = 1694;

function Meal() {
  const [mealRecords, setMealRecords] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (record) => {
    navigate("/result", { state: record });
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("mealRecords") || "[]");
    setMealRecords(stored);
  }, []);

  return (
    <>
      <div className="p-4 sm:p-6 container mx-auto space-y-8 sm:w-[1020px]">
        <div className="flex gap-4 items-center justify-center">
          <div className="text-center text-lg sm:text-2xl font-bold">〈</div>
          <div className="text-center text-lg sm:text-2xl font-bold">
            25-06-25 (수)
          </div>
          <div className="text-center text-lg sm:text-2xl font-bold">〉</div>
        </div>

        <div className="card bg-base-100 shadow-lg p-4 px-0 sm:px-40">
          <div className="text-md mb-4">
            <span className="font-bold">총 섭취량</span>{" "}
            <span className="text-purple-500 font-bold">0000</span> /{" "}
            {calorieGoal}kcal
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-purple-500 h-4 rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
          <div className="flex gap-10 justify-between">
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  탄수화물 <span className="text-green">000</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-green h-4 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  단백질 <span className="text-yellow">000</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-yellow h-4 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  지방 <span className="text-red">000</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-red h-4 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 식사 기록 */}
        <h2 className="m-0 text-lg sm:text-xl font-semibold">식사기록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mealRecords.map((record) => (
            <div key={record.id} onClick={() => handleCardClick(record)}>
              <div className="card bg-base-100 w-full rounded-xl shadow-lg p-[20px]">
                <figure className="mt-4">
                  <img
                    className="rounded-xl h-[180px] w-full object-cover"
                    src={record.imageUrl}
                    alt="음식 사진"
                  />
                </figure>
                <div className="card-body p-0">
                  <h2 className="card-title flex mt-2">
                    <span className="text-sm text-gray-500">
                      {record.mealType}
                    </span>
                    <span className="text-purple-500">{record.kcal}kcal</span>
                  </h2>
                  <div className="text-[16px] font-semibold flex gap-4">
                    <p>
                      탄 <span className="text-green">{record.carbs}</span>g
                    </p>
                    <p>
                      단 <span className="text-yellow">{record.protein}</span>g
                    </p>
                    <p>
                      지 <span className="text-red">{record.fat}</span>g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MealPickerModal />
    </>
  );
}

export default Meal;
