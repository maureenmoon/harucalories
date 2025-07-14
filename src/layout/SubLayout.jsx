import React from "react";
import { Link } from "react-router-dom";

function SubLayout({ to, menu, label }) {
  return (
    <div className="w-full bg-white border-b border-gray-300 flex justify-center items-center p-3 pb-0">
      <div className="container w-[1020px] pt-4 md:pt-8 pb-4 flex flex-col items-start text-gray-600 md:flex-row md:items-start mt-4">
        <Link to={to}>
          <div className="flex items-center justify-center">
            <p className="flex items-center text-base md:text-xl text-gray-400 font-medium hover:underline cursor-pointer">
              <span>{menu} </span>
              <span className="hidden md:inline-block ml-1 text-xl align-middle">
                ＞
              </span>
            </p>
          </div>
        </Link>
        <h1 className="text-3xl md:text-xl font-semibold text-center md:text-left mt-0 md:mt-0">
          {label}
        </h1>
      </div>
    </div>
  );
}

export default SubLayout;
