import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePhoto } from "../../slices/loginSlice";
import ProfileImage from "../../components/mypage/ProfileImage";
import InfoList from "../../components/mypage/InfoList";

export default function ProfileSearch() {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  if (!user || !user.nickname)
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">로딩 중...</div>
      </div>
    );

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
    <div className="p-6 sm:p-8">
      {/* 프로필 헤더 */}
      <div className="bg-purple-50 rounded-lg p-6 mb-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <ProfileImage nickname={user.nickname} photo={user.photo} />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user.nickname}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className="mb-8">
        <InfoList user={user} />
      </div>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={() => navigate("/mypage/edit")}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
        >
          프로필 수정
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          메인으로
        </button>
        <button
          onClick={() => navigate("/mypage/withdraw")}
          className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}
