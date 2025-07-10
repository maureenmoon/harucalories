import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex  justify-between mt-2 mb-2 w-[1020px] mx-auto ">
      <div>
        <img src="./images/main_icon.png" alt="" />
      </div>
      <div className="flex items-center">
        <p className="text-sm mt-7">이서진님! 🙋반갑습니다</p>
        <button className="btn btn-ghost text-gray-400 text-sm mt-7">
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Header;
