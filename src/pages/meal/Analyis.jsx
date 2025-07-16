import React, { useRef, useState } from "react";
import SubLayout from "../../layout/SubLayout";
import { useSelector } from "react-redux";
import axios from "axios";

function Analyis() {
  const fileInputRef = useRef(null);
  const selectedMeal = useSelector((state) => state.meal.selectedMeal);
  // const [image, setImage] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //로딩창
  const [images, setImages] = useState([]); //추가 이미지

  const handleImageClick = (e) => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImage = {
      file,
      url: URL.createObjectURL(file),
    };

    setImages((prev) => [...prev, newImage]);

    await sendImageToBackend(file);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const sendImageToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/food/analyze",
        formData
      );
      const text = res.data.result;
      const parsed = parseNutritionData(text);
      setResultData(parsed);
    } catch (err) {
      console.error("이미지 분석 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const parseNutritionData = (text) => {
    const get = (label) => {
      const regex = new RegExp(`${label}:\\s*(\\d+(\\.\\d+)?)`);
      const match = text.match(regex);
      return match ? parseFloat(match[1]) : 0;
    };

    return {
      foodName: text.match(/요리명:\s*(.+)/)?.[1] || "알 수 없음",
      kcal: get("칼로리"),
      carbs: get("탄수화물"),
      protein: get("단백질"),
      fat: get("지방"),
      sodium: get("나트륨"),
      fiber: get("식이섬유"),
      gram: text.match(/총량:\s*(.+)/)?.[1] || "알 수 없음",
    };
  };

  return (
    <>
      <SubLayout to={"/"} menu={"식단분석"} label={"식사요약"} />
      <div className="w-full max-w-[1020px] mx-auto px-4 py-4">
        {/* 날짜 / 시간 / 식사타입 */}
        <div className="flex flex-row sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="2025-06-25(수)"
            className="input input-bordered-full flex-1 text-center"
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

        <div className="border-b border-gray-300">
          {/* 이미지 업로드 */}
          <div
            className="relative bg-gray-200 h-60 sm:h-64 md:h-72 rounded-xl flex items-center justify-center mb-6 cursor-pointer"
            onClick={handleImageClick}
          >
            {images.length > 0 ? (
              <>
                <img
                  src={images[0].url}
                  alt="업로드된 이미지"
                  className="object-cover w-full h-full rounded-xl"
                />
                {resultData?.foodName && (
                  <div className="absolute top-4 left-4 bg-purple-500/90 text-white text-xl font-bold px-4 py-2 rounded-full">
                    {resultData.foodName}
                  </div>
                )}
              </>
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
            <div className="flex justify-between font-bold text-lg mb-6 px-10">
              <h2>총 섭취량</h2>
              <div className="flex">
                <p>{resultData?.kcal || 0}</p>
                <span className="text-purple-500">kcal</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base">
              {/* {resultData && (
                <div className="bg-gray-100 rounded-xl p-6 mt-6">
                  <h2 className="text-xl font-bold mb-2">분석 결과</h2>
                  <p>
                    <strong>요리명:</strong> {resultData.foodName}
                  </p>
                  <p>
                    <strong>총량:</strong> {resultData.gram}
                  </p>
                  <p>
                    <strong>칼로리:</strong> {resultData.kcal} kcal
                  </p>
                  <p>
                    <strong>탄수화물:</strong> {resultData.carbs} g
                  </p>
                  <p>
                    <strong>단백질:</strong> {resultData.protein} g
                  </p>
                  <p>
                    <strong>지방:</strong> {resultData.fat} g
                  </p>
                  <p>
                    <strong>나트륨:</strong> {resultData.sodium} g
                  </p>
                  <p>
                    <strong>식이섬유:</strong> {resultData.fiber} g
                  </p>
                </div>
              )} */}
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
        </div>
        <div className="">
          <div className=" rounded-xl p-7 ps-0">
            <div className="flex justify-between font-bold text-2xl ">
              <h2>음식 정보 수정</h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto mb-8">
            <div
              className="min-w-[44px] h-56 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl cursor-pointer"
              onClick={handleImageClick}
            >
              +
            </div>

            {images.map((img, i) => (
              <>
                <div className="flex flex-col items-center">
                  <div
                    key={i}
                    className="relative object-cover w-[200px] h-50 bg-gray-300 rounded-xl overflow-hidden"
                  >
                    <img
                      src={img.url}
                      alt={`uploaded-${i}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                  {/* <p>{resultData.foodName}</p> */}
                </div>
              </>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-bold text-xl">
                {resultData?.foodName || "요리명"}
              </p>
              <p className="text-sm text-gray-500 mt-1">음식량</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold text-purple-500">
                −
              </button>
              <div className="w-10 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                1
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold text-purple-500">
                ＋
              </button>
              <span className="ml-2 text-sm text-gray-500">100g</span>
            </div>
          </div>
        </div>

        <button className="btn bg-purple-500 text-white w-full rounded-lg py-6 text-base">
          기록하기
        </button>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
            <span className="loader border-4 border-purple-500 border-t-transparent rounded-full w-8 h-8 animate-spin" />
            <p className="text-lg font-bold text-purple-700">
              분석 중입니다...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Analyis;
