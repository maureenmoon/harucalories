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
import MealPickerModal from "../../components/meal/MealPickerModal";
import { Link } from "react-router-dom";

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
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{value}g</span>
    </div>
    <progress
      className={`progress progress-${color} w-full p-2`}
      value={value}
      max="100"
    ></progress>
  </div>
);

function Meal() {
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
          <div className="flex gap-10 justify-center">
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
        <h2 className="m-0 text-lg sm:text-2xl font-bold">식사기록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <Link to="/Result" key={i}>
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
            </Link>
          ))}
        </div>
      </div>
      <MealPickerModal />
    </>
  );
}

export default Meal;
