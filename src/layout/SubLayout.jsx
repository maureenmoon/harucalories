import React from "react";

function SubLayout() {
  return (
    <div className="w-full bg-white border-b border-gray-300 flex justify-center items-center">
      <div className="container w-[1020px] pt-4 md:pt-8 pb-4 flex flex-col items-center md:flex-row md:items-start">
        <Link to="/community" className="hidden md:block">
          <p className="text-[18px] md:text-3xl font-semibold hover:underline cursor-pointer">
            커뮤니티>
          </p>
        </Link>
        <h1 className="text-[18px] md:text-3xl font-semibold text-center md:text-left mt-0 md:mt-0">
          핫이슈
        </h1>
      </div>
    </div>
  );
}

export default SubLayout;
