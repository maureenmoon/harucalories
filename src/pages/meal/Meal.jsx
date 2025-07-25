import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMealRecords } from "../../slices/mealSlice";
import { useNavigate } from "react-router-dom";
import MealPickerModal from "../../components/meal/MealPickerModal";
import axios from "axios";
import MealCalendarModal from "../../components/meal/MealCalendarModal";

const calorieGoal = 1694;

function Meal() {
  const mealRecords = useSelector((state) => state.meal.mealRecords);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    // yyyy-mm-dd 형식으로 변환
    return today.toISOString().slice(0, 10);
  }); // 기본 날짜를 오늘로 설정
  const [calendarOpen, setCalendarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (record) => {
    navigate(`/result/${record.id}`);
  };

  // 날짜 변경 함수
  const changeDate = (diff) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + diff);
    const newDate = date.toISOString().slice(0, 10);
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/meals/modified-date/member/1?date=${selectedDate}`
        );
        // 배열이 아니면 빈 배열로 처리
        const records = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        let kcal = 0,
          carbs = 0,
          protein = 0,
          fat = 0;

        const updatedRecords = records.map((record) => {
          let recordCalories = 0;
          let recordCarbs = 0;
          let recordProtein = 0;
          let recordFat = 0;

          record.foods.forEach((food) => {
            recordCalories += food.calories || 0;
            recordCarbs += food.carbohydrate || 0;
            recordProtein += food.protein || 0;
            recordFat += food.fat || 0;
          });

          kcal += recordCalories;
          carbs += recordCarbs;
          protein += recordProtein;
          fat += recordFat;

          return {
            ...record,
            calories: recordCalories,
            carbohydrate: recordCarbs,
            protein: recordProtein,
            fat: recordFat,
          };
        });

        dispatch(setMealRecords(updatedRecords));
      } catch (err) {
        console.error("식사 기록 불러오기 실패", err);
      }
    };

    loadMeals();
  }, [selectedDate, dispatch]);

  // mealRecords의 합계 계산을 useMemo로 관리
  const totalKcal = useMemo(
    () => mealRecords.reduce((sum, r) => sum + (r.calories || 0), 0),
    [mealRecords]
  );
  const totalCarbs = useMemo(
    () => mealRecords.reduce((sum, r) => sum + (r.carbohydrate || 0), 0),
    [mealRecords]
  );
  const totalProtein = useMemo(
    () => mealRecords.reduce((sum, r) => sum + (r.protein || 0), 0),
    [mealRecords]
  );
  const totalFat = useMemo(
    () => mealRecords.reduce((sum, r) => sum + (r.fat || 0), 0),
    [mealRecords]
  );

  return (
    <>
      <div className="p-4 sm:p-6 container mx-auto space-y-8 sm:w-[1020px]">
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => changeDate(-1)}
            className="text-center text-lg sm:text-2xl font-bold"
          >
            〈
          </button>
          <div
            className="text-center text-lg sm:text-2xl font-bold cursor-pointer"
            onClick={() => setCalendarOpen(true)}
          >
            {selectedDate}
          </div>
          <button
            onClick={() => changeDate(1)}
            className="text-center text-lg sm:text-2xl font-bold"
          >
            〉
          </button>
        </div>

        <div className="card bg-base-100 shadow-lg p-4 px-0 sm:px-40">
          <div className="text-md mb-4">
            <span className="font-bold">총 섭취량</span>{" "}
            <span className="text-purple-500 font-bold">{totalKcal}</span> /{" "}
            {calorieGoal}kcal
          </div>

          {/* 전체 kcal */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-700 h-4 rounded-full"
              style={{
                width: `${Math.min((totalKcal / calorieGoal) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <div className="flex gap-10 justify-between">
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  탄수화물 <span className="text-green">{totalCarbs}</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-green to-green-700 h-4 rounded-full"
                  style={{
                    width: `${Math.min((totalCarbs / 300) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  단백질 <span className="text-yellow">{totalProtein}</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-yellow to-yellow-700 h-4 rounded-full"
                  style={{
                    width: `${Math.min((totalProtein / 60) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  지방 <span className="text-red">{totalFat}</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-red to-red-700 h-4 rounded-full"
                  style={{ width: `${Math.min((totalFat / 70) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 식사 기록 */}
        <h2 className="m-0 pb-3 text-lg sm:text-xl font-semibold">식사기록</h2>
        {mealRecords.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-base sm:text-lg">
            입력된 기록이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mealRecords.map((record) => (
              <div key={record.id} onClick={() => handleCardClick(record)}>
                <div
                  className="card justify-between bg-base-100 w-full rounded-xl shadow-lg p-[20px] transition duration-200 cursor-pointer hover:shadow-[0_0_24px_4px_rgba(156,163,175,0.4)] hover:border-2 hover:border-gray hover:scale-105"
                  style={{ border: "2px solid transparent" }}
                >
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
                        {record.mealType === "BREAKFAST"
                          ? "아침"
                          : record.mealType === "LUNCH"
                          ? "점심"
                          : record.mealType === "DINNER"
                          ? "저녁"
                          : record.mealType === "SNACK"
                          ? "간식"
                          : record.mealType}
                      </span>
                      <span className="text-purple-500">
                        {record.calories}kcal
                      </span>
                    </h2>
                    <div className="text-[16px] font-semibold flex gap-4">
                      <p>
                        탄{" "}
                        <span className="text-green">
                          {record.carbohydrate}
                        </span>
                        g
                      </p>
                      <p>
                        단 <span className="text-yellow">{record.protein}</span>
                        g
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
        )}
      </div>
      <MealPickerModal />
      <MealCalendarModal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onSelectDate={setSelectedDate}
        memberId={1}
      />
    </>
  );
}

export default Meal;
