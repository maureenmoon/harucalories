import React, { useRef, useState } from "react";
import SubLayout from "../../layout/SubLayout";
import { useSelector } from "react-redux";
import axios from "axios";

function Analyis() {
  const fileInputRef = useRef(null);
  const selectedMeal = useSelector((state) => state.meal.selectedMeal);
  const [image, setImage] = useState(null);
  const [resultData, setResultData] = useState(null);

  const handleImageClick = (e) => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    await sendImageToBackend(file);
  };

  const sendImageToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/food/analyze",
        formData
      );
      const text = res.data;
      const parsed = parseNutritionData(text);
      setResultData(parsed);
    } catch (err) {
      console.error("이미지 분석 실패:", err);
    }
  };

  const parseNutritionData = (text) => {
    const get = (label) => {
      const regex = new RegExp(`${label}:\\s*(\\d+(\\.\\d+)?)`);
      const match = text.match(regex);
      return match ? parseFloat(match[1]) : 0;
    };

    return {
      calories: get("칼로리"),
      carbs: get("탄수화물"),
      protein: get("단백질"),
      fat: get("지방"),
      sodium: get("나트륨"),
    };
  };

  return (
    <>
      <SubLayout to={"/"} menu={"식단분석"} label={"식사요약"} />
      <div className="w-full max-w-[1020px] mx-auto px-4 py-3">
        {/* 날짜 / 시간 / 식사타입 */}
        <div className="flex flex-row sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="2025-06-25(수)"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            placeholder="오전 09:04"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={selectedMeal}
            readOnly
            className="input input-bordered flex-1 text-center"
          />
        </div>

        {/* 이미지 업로드 */}
        <div
          className="bg-gray-200 h-60 sm:h-64 md:h-72 rounded-xl flex items-center justify-center mb-6 cursor-pointer"
          onClick={handleImageClick}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="업로드된 이미지"
              className="object-cover w-full h-full rounded-xl"
            />
          ) : (
            <span className="text-4xl text-gray-400">＋</span>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* 총 섭취량 */}
        <div className="bg-gray-100 rounded-xl p-7 pb-7 mb-6">
          <div className="flex justify-between font-bold text-lg mb-4 px-10">
            <h2>총 섭취량</h2>
            <div className="flex">
              <p>{resultData?.calories || 0}</p>
              <span className="text-purple-500">kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base">
            {[
              ["탄수화물", resultData?.carbs],
              ["단백질", resultData?.protein],
              ["지방", resultData?.fat],
              ["나트륨", resultData?.sodium],
            ].map(([label, value], i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                  {value ?? 0}
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="btn bg-purple-500 text-white w-full rounded-lg text-base">
          기록하기
        </button>
      </div>
    </>
  );
}

export default Analyis;
