import React from "react";
import SubLayout from "../../layout/SubLayout";

function Analyis() {
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
            placeholder="아침"
            className="input input-bordered flex-1 text-center"
          />
        </div>

        {/* 이미지 업로드 박스 */}
        <div className="bg-gray-200 h-60 sm:h-64 md:h-72 rounded-xl flex items-center justify-center mb-6">
          <span className="text-4xl text-gray-400">＋</span>
        </div>

        {/* 총 섭취량 */}
        <div className="bg-gray-100 rounded-xl p-7 pb-7 mb-6">
          <div className="flex justify-between font-bold text-lg mb-4 px-10">
            <h2>총 섭취량</h2>
            <div className="flex">
              <p>1383</p>
              <span className="text-purple-500">kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base">
            {["탄수화물", "단백질", "지방", "나트륨"].map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-gray-300 rounded-full" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 기록 버튼 */}
        <button className="btn bg-purple-500 text-white w-full rounded-lg text-base">
          기록하기
        </button>
      </div>
    </>
  );
}

export default Analyis;
