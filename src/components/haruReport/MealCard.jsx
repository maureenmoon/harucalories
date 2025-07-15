import React from "react";

function MealCard({ meal }) {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="bg-purple-50 rounded-2xl p-4 mb-4 shadow-sm">
      <div>
        <div className="flex items-start gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
            {meal.imageUrl && (
              <img
                src={meal.imageUrl}
                alt="식사 이미지"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">
                  {meal.type}
                  <span className="text-sm font-normal ml-2 text-gray-600">
                    {formatTime(meal.createDate)}
                  </span>
                </h3>
                <p className="text-sm text-gray-600">
                  {formatDate(meal.createDate)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{meal.totalKcal}kcal</p>
                {meal.fastingTime && (
                  <p className="text-sm text-gray-600">
                    공복시간: {meal.fastingTime}
                  </p>
                )}
              </div>
            </div>

            {meal.foods.length > 0 && (
              <div className="mb-2">
                <h4 className="font-semibold mb-1">섭취 음식</h4>
                <div className="flex flex-wrap gap-2">
                  {meal.foods.map((food) => (
                    <span
                      key={food.foodId}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {food.foodName} ({food.kcal}kcal)
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
