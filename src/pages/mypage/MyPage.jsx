import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import ProfileSearch from "./ProfileSearch";
import EditProfile from "./EditProfile";
import WithDrawMembership from "./WithdrawMembership";
import ChatBot from "../../components/chatbot/ChatBot";

export default function MyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <nav className="flex flex-col sm:flex-row justify-around sm:justify-start gap-4 sm:gap-10 mb-6  pb-4  font-semibold text-lg">
        <Link to="profile" className="hover:text-blue-600"></Link>
        <Link to="edit" className="hover:text-blue-600"></Link>
        <Link to="withdraw" className="hover:text-red-600"></Link>
      </nav>
      <div className="bg-white p-6 sm:p-10 shadow-md rounded-xl">
        <Outlet />
        {/* 챗봇 */}
        <ChatBot />
      </div>
    </div>
  );
}
