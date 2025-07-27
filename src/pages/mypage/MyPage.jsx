// import React from "react";
// import { Link, Outlet, Route, Routes } from "react-router-dom";
// import ProfileSearch from "./ProfileSearch";
// import EditProfile from "./EditProfile";
// import WithDrawMembership from "./WithdrawMembership";
// import ChatBot from "../../components/chatbot/ChatBot";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfoList from "../../components/mypage/InfoList";
import ProfileImage from "../../components/mypage/ProfileImage";
import SubLayout from "../../layout/SubLayout";
import { fetchCurrentMember } from "../../api/authIssueUserApi/memberApi";
import useLogout from "../../utils/memberJwtUtil/useLogout";
import calculateCalories from "../../components/mypage/calculateCalories";

export default function MyPage() {
  const currentUser = useSelector((state) => state.login.user);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout();

  // Calculate recommended calories
  const recommendedCalories =
    currentUser?.birthAt &&
    currentUser?.gender &&
    currentUser?.height &&
    currentUser?.weight &&
    currentUser?.activityLevel
      ? calculateCalories({
          birthAt: currentUser.birthAt,
          gender: currentUser.gender,
          height: currentUser.height,
          weight: currentUser.weight,
          activityLevel: currentUser.activityLevel,
        })
      : null;

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchCurrentMember(); // Triggers refresh if accessToken is expired
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };

    loadUser();
  }, []);

  if (!currentUser) return null;

  return (
    // <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
    //   <nav className="flex flex-col sm:flex-row justify-around sm:justify-start gap-4 sm:gap-10 mb-6  pb-4  font-semibold text-lg">
    //     <Link to="profile" className="hover:text-blue-600"></Link>
    //     <Link to="edit" className="hover:text-blue-600"></Link>
    //     <Link to="withdraw" className="hover:text-red-600"></Link>
    //   </nav> *
    //   <div className="bg-white p-6 sm:p-10 shadow-md rounded-xl">
    //     <Outlet />
    //     {/* 챗봇 */}
    //     <ChatBot />

    <div className="w-full max-w-[1020px] mx-auto px-4">
      <SubLayout to="/" menu="마이페이지" label="내 정보" />

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4">
            <ProfileImage
              currentImage={currentUser.photo}
              readOnly
              size="large"
            />
            <h2 className="text-2xl font-bold">{currentUser.nickname}</h2>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>

          {/* User Info Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">기본 정보</h3>
            <InfoList
              items={[
                { label: "이름", value: currentUser.name },
                {
                  label: "성별",
                  value: currentUser.gender === "FEMALE" ? "여성" : "남성",
                },
                { label: "생년월일", value: currentUser.birthAt },
                { label: "키", value: `${currentUser.height} cm` },
                { label: "몸무게", value: `${currentUser.weight} kg` },
                {
                  label: "활동량",
                  value:
                    {
                      HIGH: "매우 활동적",
                      MODERATE: "활동적",
                      LOW: "낮음",
                    }[currentUser.activityLevel] || "활동적",
                },
                {
                  label: "목표 칼로리",
                  value: `${
                    currentUser.targetCalories ||
                    recommendedCalories ||
                    "계산 불가"
                  } kcal`,
                },
                {
                  label: "추천 칼로리",
                  value: recommendedCalories
                    ? `${recommendedCalories} kcal`
                    : "계산 불가",
                },
              ]}
            />
          </div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Link
              to="/mypage/edit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 text-center"
            >
              프로필 수정
            </Link>
            <Link
              to="/mypage/withdraw"
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 text-center"
            >
              회원탈퇴
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
