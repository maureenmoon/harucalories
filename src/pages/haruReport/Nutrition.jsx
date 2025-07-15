import React, { useState } from "react";
import WeightChart from "../../components/haruReport/nutrition/WeightChart";
import CalorieDonutChart from "../../components/haruReport/nutrition/CalorieDonutChart";
import DailyCalorieChart from "../../components/haruReport/nutrition/DailyCalorieChart";
import NutritionBalanceChart from "../../components/haruReport/nutrition/NutritionBalanceChart";

const Nutrition = () => {
  // 기간 선택 상태
  const [period, setPeriod] = useState("week"); // 'week' | 'month'

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">영양 분석 리포트</h1>

      {/* 기간 선택 */}
      <div className="mb-8">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="week">일주일</option>
          <option value="month">한달</option>
        </select>
      </div>

      {/* 차트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. 체중 변화 차트 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">체중 변화 추이</h2>
          <WeightChart period={period} />
        </div>

        {/* 2. 오늘의 칼로리 차트 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">오늘의 칼로리</h2>
          <CalorieDonutChart />
        </div>

        {/* 3. 일자별 칼로리 섭취 차트 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">일자별 칼로리 섭취량</h2>
          <DailyCalorieChart />
        </div>

        {/* 4. 영양소 밸런스 차트 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">영양소 밸런스</h2>
          <NutritionBalanceChart period={period} />
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
