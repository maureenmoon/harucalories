import React from "react";
import SubLayout from "../../layout/SubLayout";

function Analyis() {
  return (
    <>
      <SubLayout to={"/"} menu={"식단분석"} label={"식사요약"} />
      <div className="w-[1020px] mx-auto p-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="2025-06-25(수)"
            className="input text-center"
          />
          <input
            type="text"
            placeholder="오전 09:04"
            className="input text-center"
          />
          <input type="text" placeholder="아침" className="input text-center" />
        </div>
        <div>
          <div className="card bg-base-100 shadow-sm flex">
            <div className="px-10 pt-10">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </div>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analyis;
