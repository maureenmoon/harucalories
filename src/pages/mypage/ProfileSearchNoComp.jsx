import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePhoto } from "../../slices/loginSlice";

export default function ProfileSearch() {
  // const profile = {
  //   nickname: "toby",
  //   email: "toby@naver.com",
  //   targetCalories: 2100,
  //   activityLevel: "매우 활동적",
  //   name: "Toby Kim",
  //   height: 163,
  //   weight: 55,
  //   photo: "", // or use base64/file url
  // }

  //mock testing
  const user = useSelector((state) => state.loginSlice); //loginSlice named at loginSlice.js
  const navigate = useNavigate();

  //photo uploading
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  if (!user || !user.nickname) return <div>Loading...</div>;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(updatePhoto(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitial = (nickname) => nickname.charAt(0).toUpperCase();

  const maskPassword = (password) =>
    !password || password.length < 2 ? "●●●●●●●" : "●".repeat(password.length);

  // ✅ Function to return photo
  const renderProfileImage = () => {
    return user.photo ? (
      <img
        src={user.photo}
        alt="profile"
        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full object-cover"
      />
    ) : (
      <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-green-300 flex items-center justify-center text-white font-bold text-3xl">
        {getInitial(user.nickname)}
      </div>
    );
  };

  return (
    <div className="flex justify-center px-4 py-8 sm:px-8 lg:px-16">
      <div className="bg-white rounded-xl shadow-md w-full max-w-3xl p-6 sm:p-10 text-center">
        {/* Profile image or initial */}
        <div className="relative">
          {renderProfileImage()}
          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            사진 변경
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        {/* Name + Email */}
        <div className="mt-4 text-xl font-medium text-gray-800">
          {user.nickname}
        </div>
        <div className="text-gray-500 text-sm">{user.email}</div>

        {/* Info list */}
        <ul className="mt-6 text-sm sm:text-base text-gray-700 space-y-2 text-left max-w-md mx-auto">
          <li className="flex justify-between">
            <span>목표 칼로리(kcal)</span>
            <span>{user.targetCalories ?? "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>활동량</span>
            <span>{user.activityLevel ?? "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>키 (cm)</span>
            <span>{user.height ?? "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>체중 (kg)</span>
            <span>{user.weight ?? "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>이름</span>
            <span>{user.name ?? "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>비밀번호</span>
            <span>{maskPassword(user.password)}</span>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/mypage/withdraw")}
            className="px-4 py-2 rounded border border-blue-500 text-blue-600 font-semibold hover:bg-blue-50"
          >
            탈퇴하기
          </button>
          <button
            onClick={() => navigate("/mypage/edit")}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
