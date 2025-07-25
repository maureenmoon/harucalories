import React, { useEffect } from "react";
import SubLayout from "../../layout/SubLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import Record from "../haruReport/Record";
import { useSelector, useDispatch } from "react-redux";
import { setRecord } from "../../slices/mealSlice";

function Result() {
  const { id } = useParams();
  const record = useSelector((state) => state.meal.record);
  const dispatch = useDispatch();
  // resultData, images 등은 필요시 별도 reducer로 관리하거나 유지

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/meals/${id}`)
      .then((res) => dispatch(setRecord(res.data)))
      .catch(() => dispatch(setRecord(null)));
  }, [id, dispatch]);

  if (record === undefined)
    return (
      <div className="text-center text-gray-400 py-10 text-base sm:text-lg">
        로딩 중...
      </div>
    );
  if (record === null)
    return (
      <div className="text-center text-gray-400 py-10 text-base sm:text-lg">
        데이터가 없습니다.
      </div>
    );

  // foods 배열의 영양소 합계 계산
  const totalCalories = record.foods
    ? record.foods.reduce((sum, food) => sum + (food.calories || 0), 0)
    : 0;
  const totalCarbs = record.foods
    ? record.foods.reduce((sum, food) => sum + (food.carbohydrate || 0), 0)
    : 0;
  const totalProtein = record.foods
    ? record.foods.reduce((sum, food) => sum + (food.protein || 0), 0)
    : 0;
  const totalFat = record.foods
    ? record.foods.reduce((sum, food) => sum + (food.fat || 0), 0)
    : 0;
  const totalSodium = record.foods
    ? record.foods.reduce((sum, food) => sum + (food.sodium || 0), 0)
    : 0;

  return (
    <>
      <SubLayout to={"/"} menu={"식단분석"} label={"식사요약"} />
      <div className="w-full max-w-[1020px] mx-auto px-4 py-3">
        {/* 날짜 / 시간 / 식사타입 */}
        <div className="flex flex-row sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={record.modifiedAt ? record.modifiedAt.split("T")[0] : ""}
            placeholder="날짜를 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={
              record.modifiedAt
                ? record.modifiedAt.split("T")[1]?.slice(0, 5)
                : ""
            }
            placeholder="시간을 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={
              record.mealType === "BREAKFAST"
                ? "아침"
                : record.mealType === "LUNCH"
                ? "점심"
                : record.mealType === "DINNER"
                ? "저녁"
                : record.mealType === "SNACK"
                ? "간식"
                : record.mealType
            }
            readOnly
            className="input input-bordered flex-1 text-center"
          />
        </div>

        <div className="border-b border-gray-300">
          {/* 이미지 업로드 박스 */}
          <div className="bg-gray-200 h-60 sm:h-64 md:h-72 rounded-xl flex items-center justify-center mb-6">
            <img
              src={record.imageUrl}
              alt="기록된 음식"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          {/* 총 섭취량 */}
          <div className="bg-gray-100 rounded-xl p-7 pb-7 mb-6">
            <div className="flex justify-between font-bold text-lg mb-4 px-10">
              <h2>총 섭취량</h2>
              <div className="flex">
                <p>{totalCalories}</p>
                <span className="text-purple-500">kcal</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base">
              {[
                ["탄수화물", totalCarbs],
                ["단백질", totalProtein],
                ["지방", totalFat],
                ["나트륨", Math.round(totalSodium * 10) / 10],
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
          {/* ... resultData, images 등은 필요시 별도 reducer로 관리 ... */}
        </div>

        <div className="">
          <div className="rounded-xl pt-7 pr-7 pb-3 ps-0">
            <div className="flex justify-between font-bold text-2xl ">
              <h2 className="text-lg sm:text-xl font-semibold">메모</h2>
            </div>
          </div>
          <textarea
            className="input input-bordered w-full mt-2 h-32 p-4 resize-none"
            value={record.memo || ""}
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
