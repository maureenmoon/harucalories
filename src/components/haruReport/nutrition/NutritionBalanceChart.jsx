import React, { useRef, useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NutritionBalanceChart = ({ period }) => {
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
    { nutrient: "탄수화물", amount: 120, percentage: 80, recommended: 150 },
    { nutrient: "단백질", amount: 80, percentage: 90, recommended: 89 },
    { nutrient: "지방", amount: 45, percentage: 75, recommended: 60 },
    { nutrient: "나트륨", amount: 1500, percentage: 65, recommended: 2300 },
    { nutrient: "식이섬유", amount: 15, percentage: 60, recommended: 25 },
  ];

  const radarData = data.map((item) => ({
    subject: item.nutrient,
    A: item.percentage,
    fullMark: 100,
  }));

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = data.find((d) => d.nutrient === label);
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{label}</p>
          <p>섭취량: {item.amount}g</p>
          <p>권장량: {item.recommended}g</p>
          <p>달성률: {item.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={containerRef}>
      {/* 레이더 차트 */}
      <div className="w-full h-[250px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="영양소 균형"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 영양소 막대 그래프 */}
      <div className="w-full">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} unit="%" />
              <YAxis dataKey="nutrient" type="category" width={80} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="percentage"
                fill="#8884d8"
                name="달성률"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 영양소 수치 표 */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {data.map((item, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded">
              <p className="font-semibold">{item.nutrient}</p>
              <p>
                {item.amount}g / {item.recommended}g
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionBalanceChart;
