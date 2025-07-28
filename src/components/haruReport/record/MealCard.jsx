import React from "react";

function MealCard({ meal }) {
  if (!meal) return null;

  console.log("🔍 MealCard - 받은 meal 데이터:", meal);
  console.log("🔍 MealCard - meal의 모든 키들:", Object.keys(meal));

  // 🔍 음식 데이터 구조 확인을 위한 디버깅
  if (meal.foods && meal.foods.length > 0) {
    console.log("🔍 MealCard - 첫 번째 음식 데이터:", meal.foods[0]);
    console.log(
      "🔍 MealCard - 첫 번째 음식의 키들:",
      Object.keys(meal.foods[0])
    );
    meal.foods.forEach((food, index) => {
      console.log(`🔍 MealCard - food[${index}]:`, {
        foodName: food.foodName,
        calories: food.calories,
        kcal: food.kcal,
        calorie: food.calorie,
        "모든 키": Object.keys(food),
      });
    });
  }

  const formatTime = (dateString) => {
    if (!dateString) {
      console.warn("⚠️ MealCard - 날짜 문자열이 없음");
      return "시간 없음";
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("🚨 MealCard - 잘못된 날짜 형식:", dateString);
        return "잘못된 시간";
      }

      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("🚨 MealCard - 시간 파싱 에러:", error);
      return "시간 형식 오류";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("⚠️ MealCard - 날짜 문자열이 없음");
      return "날짜 없음";
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("🚨 MealCard - 잘못된 날짜 형식:", dateString);
        return "잘못된 날짜";
      }

      return date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("🚨 MealCard - 날짜 파싱 에러:", error);
      return "날짜 형식 오류";
    }
  };

  // 🔥 modifiedAt 우선으로 날짜 필드 가져오기
  const primaryDateField =
    meal.modifiedAt || meal.createDate || meal.createdDate || meal.date;

  console.log("🔍 MealCard - 사용할 날짜 필드:", primaryDateField);
  console.log("🔍 MealCard - modifiedAt:", meal.modifiedAt);
  console.log("🔍 MealCard - createDate:", meal.createDate);

  return (
    <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 shadow-sm">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-full sm:w-30 h-30 bg-gray-200 rounded-lg overflow-hidden">
            {meal.imageUrl && (
              <img
                src={meal.imageUrl}
                alt="식사 이미지"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {meal.type}
                <span className="text-xs sm:text-sm font-normal ml-1 text-gray-600">
                  {formatTime(primaryDateField)}
                </span>
              </h3>

              <div className="text-right mt-1 sm:mt-0">
                <p className="text-base sm:text-lg font-semibold">
                  {meal.totalKcal || meal.calories || 0}kcal
                </p>
              </div>
            </div>

            {meal.foods && meal.foods.length > 0 && (
              <div className="mb-2 mt-5">
                <h4 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">
                  섭취 음식
                </h4>
                <div className="flex flex-wrap gap-2">
                  {meal.foods.map((food, index) => (
                    <span
                      key={food.foodId || index}
                      className="bg-white px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      {food.foodName} ({food.calories}kcal)
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
