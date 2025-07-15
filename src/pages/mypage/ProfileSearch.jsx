import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePhoto } from "../../slices/loginSlice";
import ProfileImage from "../../components/mypage/ProfileImage";
import InfoList from "../../components/mypage/InfoList";

export default function ProfileSearch() {
  const user = useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <div className="flex justify-center px-4 py-8 sm:px-8 lg:px-16">
      <div className="bg-white rounded-xl shadow-md w-full max-w-3xl p-6 sm:p-10 text-center">
        {/* Profile image and update button */}
        <div className="relative">
          <ProfileImage nickname={user.nickname} photo={user.photo} />
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
        <InfoList user={user} />

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
