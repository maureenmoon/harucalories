import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const calorieGoal = 1694;

const donutData = {
  labels: ["아침", "점심", "저녁", "간식"],
  datasets: [
    {
      data: [41.5, 41.1, 0.0, 17.4],
      backgroundColor: ["#91cb74", "#f7cd66", "#fb8d62", "#5470c6"],
      borderWidth: 0,
    },
  ],
};

const barData = [
  { name: "06/17", intake: 1000 },
  { name: "06/18", intake: 0 },
  { name: "06/19", intake: 0 },
];

const Progress = ({ label, value, color }) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs mb-1">
      <span>{label}</span>
      <span>{value}g</span>
    </div>
    <progress
      className={`progress progress-${color} w-full`}
      value={value}
      max="100"
    ></progress>
  </div>
);

function Meal() {
  return (
    <div className="p-4 sm:p-6 container mx-auto space-y-8 sm:w-[1020px]">
      {/* 날짜 */}
      <div className="text-center text-lg sm:text-2xl font-bold">
        25-06-25 (수)
      </div>

      {/* 총 섭취량 */}
      <div className="card bg-base-100 shadow-lg p-4">
        <div className="text-md mb-2">
          <span className="font-bold">총 섭취량</span>{" "}
          <span className="text-purple-500">0000</span> / {calorieGoal}kcal
        </div>

        <Progress label="탄수화물" value={0} color="success" />
        <Progress label="단백질" value={0} color="warning" />
        <Progress label="지방" value={0} color="error" />
      </div>

      {/* 식사 기록 */}
      <h2 className="m-0 text-lg sm:text-2xl font-bold">식단기록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="card bg-base-100 w-full rounded-xl shadow-lg p-[20px]"
          >
            <figure className="mt-4">
              <img
                className="rounded-xl h-[180px] w-full object-cover"
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="음식 사진"
              />
            </figure>
            <div className="card-body p-0">
              <h2 className="card-title">
                {/* {meal.name}{" "} */}
                <span className="text-purple-500">000kcal</span>
              </h2>

              <div className="text-[16px] font-semibold flex gap-4 mt-1">
                <p>
                  탄 <span className="text-green">000</span>g
                </p>
                <p>
                  단 <span className="text-yellow">000</span>g
                </p>
                <p>
                  지 <span className="text-red">000</span>g
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 영양습관 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 도넛 차트 */}
        <div className="card bg-base-100 shadow-lg p-4">
          <div className="text-center font-bold mb-2">오늘의 칼로리</div>
          <div className="w-full max-w-xs mx-auto">
            {/* <Doughnut data={donutData} /> */}
          </div>
        </div>

        {/* 바 차트 */}
        <div className="card bg-base-100 shadow-lg p-4">
          <div className="text-center font-bold mb-2">일자별 칼로리</div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <ReferenceLine
                  y={calorieGoal}
                  stroke="red"
                  label="목표 섭취량"
                />
                <Bar dataKey="intake" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meal;
