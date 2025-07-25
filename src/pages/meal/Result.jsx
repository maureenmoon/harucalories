import React, { useState } from "react";
import SubLayout from "../../layout/SubLayout";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Record from "../haruReport/Record";

function Result() {
  const { id } = useParams();
  const [mealRecords, setMealRecords] = useState([]);
  const location = useLocation();
  const [resultData, setResultData] = useState([]); //음식 이름 저장
  const [images, setImages] = useState([]); //추가 이미지
  const passedRecord = location.state;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("mealRecords") || "[]");
    setMealRecords(stored);
  }, []);

  const handleImageClick = (e) => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <SubLayout to={"/"} menu={"식단분석"} label={"식사요약"} />
      <div className="w-full max-w-[1020px] mx-auto px-4 py-3">
        {/* 날짜 / 시간 / 식사타입 */}
        <div className="flex flex-row sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={
              passedRecord.modifiedAt
                ? passedRecord.modifiedAt.split("T")[0]
                : ""
            }
            placeholder="날짜를 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={
              passedRecord.modifiedAt
                ? passedRecord.modifiedAt.split("T")[1]?.slice(0, 5)
                : ""
            }
            placeholder="시간을 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={
              passedRecord.mealType === "BREAKFAST"
                ? "아침"
                : passedRecord.mealType === "LUNCH"
                ? "점심"
                : passedRecord.mealType === "DINNER"
                ? "저녁"
                : passedRecord.mealType === "SNACK"
                ? "간식"
                : passedRecord.mealType
            }
            readOnly
            className="input input-bordered flex-1 text-center"
          />
        </div>

        <div className="border-b border-gray-300">
          {/* 이미지 업로드 박스 */}
          <div className="bg-gray-200 h-60 sm:h-64 md:h-72 rounded-xl flex items-center justify-center mb-6">
            <img
              src={passedRecord.imageUrl}
              alt="기록된 음식"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          {/* 총 섭취량 */}
          <div className="bg-gray-100 rounded-xl p-7 pb-7 mb-6">
            <div className="flex justify-between font-bold text-lg mb-4 px-10">
              <h2>총 섭취량</h2>
              <div className="flex">
                <p>{passedRecord.calories || 0}</p>
                <span className="text-purple-500">kcal</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base">
              {[
                ["탄수화물", passedRecord.carbohydrate],
                ["단백질", passedRecord.protein],
                ["지방", passedRecord.fat],
                ["나트륨", Math.round((passedRecord.sodium ?? 0) * 10) / 10],
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

        <div className="border-b border-gray-300">
          <div className="rounded-xl pt-7 pr-7 pb-3 ps-0">
            <div className="flex justify-between font-bold text-2xl ">
              <h2 className="text-lg sm:text-xl font-semibold">
                음식 정보 수정
              </h2>
            </div>
          </div>

          {/* 이미지 카드 수평 슬라이드 */}
          <div className="overflow-x-auto no-scrollbar mb-8">
            <div className="flex gap-4 w-max px-1">
              {/* 이미지 추가 버튼 */}
              <div
                className="min-w-[44px] h-56 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl cursor-pointer"
                onClick={handleImageClick}
              >
                +
              </div>

              {/* 이미지 카드만 */}
              {images.map((img, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-[200px] h-[200px] bg-gray-300 rounded-xl overflow-hidden">
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
                  <p className="mt-2 text-sm font-medium">
                    {resultData[i]?.foodName || "요리명"}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* 이미지별 분석 결과는 아래쪽에 세로로 나열 */}
          {resultData.map((data, i) => (
            <div key={i} className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold">
                    {data.foodName || "요리명"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {data.gram || "총량 정보 없음"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold text-purple-500">
                    −
                  </button>
                  <div className="w-10 h-8 flex items-center justify-center boborder-b border-gray-300rder border-gray-300 rounded-md">
                    1
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold text-purple-500">
                    음식 정보 수정 ＋
                  </button>
                  {/* <span className="ml-2 text-sm text-gray-500">100g</span> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="">
          <div className="rounded-xl pt-7 pr-7 pb-3 ps-0">
            <div className="flex justify-between font-bold text-2xl ">
              <h2 className="text-lg sm:text-xl font-semibold">메모</h2>
            </div>
          </div>
          <textarea
            className="input input-bordered w-full mt-2 h-32 p-4 resize-none"
            value={passedRecord.memo || ""}
            readOnly
            style={{ minHeight: "8rem", fontSize: "16px" }}
          />
        </div>

        {/* 기록 버튼 */}
        <div className="pt-8">
          <button className="btn bg-purple-500 text-white w-full rounded-lg py-6 text-base mb-2">
            기록하기
          </button>
          <button className="btn bg-red text-white w-full rounded-lg py-6 text-base">
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
}

export default Result;
