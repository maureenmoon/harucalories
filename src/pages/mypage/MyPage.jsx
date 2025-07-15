import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProfileSearch from "./ProfileSearch";
import EditProfile from "./EditProfile";
import WithDrawMembership from "./WithdrawMembership";

export default function MyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <nav className="flex flex-col sm:flex-row justify-around sm:justify-start gap-4 sm:gap-10 mb-6 bprder-b pb-4 text-gray-600 font-semibold text-lg">
        <Link to="profile" className="hover:text-blue-600">
          Profile
        </Link>
        <Link to="editProfile" className="hover:text-blue-600">
          EditProfile
        </Link>
        <Link to="withdraw" className="hover:text-red-600">
          withdraw
        </Link>
      </nav>
      <div className="bg-white p-6 sm:p-10 shadow-md rounded-xl">
        <Routes>
          <Route path="profile" element={<ProfileSearch />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="withdraw" element={<WithDrawMembership />} />
        </Routes>
      </div>
    </div>
  );
}
