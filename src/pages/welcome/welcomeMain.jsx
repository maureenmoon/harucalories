import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SubLayout from "../../layout/SubLayout";

export default function MyPage() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
      <SubLayout to="/" menu="마이페이지" label="내 정보" />
      <div className="mt-6 sm:mt-10 space-y-6">
        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <nav className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            <Link
              to="/mypage/profile"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center ${
                isActive("profile")
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              내 프로필
            </Link>
            <Link
              to="/mypage/edit"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center ${
                isActive("edit")
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              프로필 수정
            </Link>
            <Link
              to="/mypage/withdraw"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center ${
                isActive("withdraw")
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              회원 탈퇴
            </Link>
          </nav>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="bg-white rounded-lg shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
