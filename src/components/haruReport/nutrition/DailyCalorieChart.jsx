import React, { useRef, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const DailyCalorieChart = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 임시 데이터 (나중에 API로 대체)
  const data = [
    { date: "6/1", calories: 2200 },
    { date: "6/2", calories: 1800 },
    { date: "6/3", calories: 2100 },
    { date: "6/4", calories: 1950 },
    { date: "6/5", calories: 2300 },
    { date: "6/6", calories: 1750 },
    { date: "6/7", calories: 2000 },
  ];

  const targetCalories = 2000; // 목표 칼로리 (나중에 사용자 설정값으로 대체)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{label}</p>
          <p>{payload[0].value}kcal</p>
          <p className="text-sm text-gray-500">
            {payload[0].value > targetCalories ? "목표 초과" : "목표 미달"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={containerRef}>
      <div className="mb-4">
        <span className="text-gray-600">목표 칼로리:</span>
        <span className="ml-2 font-bold">{targetCalories}kcal</span>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine
              y={targetCalories}
              label="목표 칼로리"
              stroke="#ff7300"
              strokeDasharray="3 3"
            />
            <Bar
              dataKey="calories"
              fill="#8884d8"
              name="섭취 칼로리"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyCalorieChart;
