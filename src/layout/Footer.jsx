import React from "react";

function Footer() {
  return (
    <div className="bg-[#f7f7f7] py-10">
      <div className="container m-auto flex flex-col justify-center items-center gap-3 px-3">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <p className="text-purple-500 text-xl sm:text-2xl font-semibold">
            전화 02-3667-0008
          </p>
          <p className="text-sm sm:text-base">
            서울특별시 구로구 경인로 557 삼영빌딩 4층
          </p>
        </div>

        <p className="text-gray-400 text-sm sm:text-base">
          © 하이미디어 구로캠버스 자바 풀스택 AI 융합 웹개발
        </p>
      </div>
    </div>
  );
}

export default Footer;
