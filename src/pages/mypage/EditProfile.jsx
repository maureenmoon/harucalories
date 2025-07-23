import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../slices/loginSlice";
import FormInput from "../../components/mypage/FormInput";
import FormSelect from "../../components/mypage/FormSelect";
import calculateCalories from "../../components/mypage/calculateCalories";

export default function EditProfile() {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user.name || "",
    height: user.height || "",
    weight: user.weight || "",
    activityLevel: user.activityLevel || "활동적",
    birthAt: user.birthAt || "",
    gender: user.gender || "여성",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCalories = calculateCalories(form);
    dispatch(editProfile({ ...form, targetCalories: newCalories }));
    navigate("/mypage/profile");
  };

  return (
    <div className="p-6 sm:p-8">
      {/* 안내 섹션 */}
      <div className="bg-purple-50 rounded-lg p-4 sm:p-6 border border-purple-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="font-bold text-gray-900 text-lg">프로필 수정하기</h2>
        </div>
        <p className="text-purple-700 text-sm">
          변경된 정보에 따라 목표 칼로리가 자동으로 재계산됩니다.
        </p>
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              이름
            </label>
            <FormInput
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              생년월일
            </label>
            <FormInput
              name="birthAt"
              type="date"
              value={form.birthAt}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              성별
            </label>
            <FormSelect
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={[
                { value: "FEMALE", label: "여성" },
                { value: "MALE", label: "남성" },
              ]}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              활동 수준
            </label>
            <FormSelect
              name="activityLevel"
              value={form.activityLevel}
              onChange={handleChange}
              options={[
                { value: "LOW", label: "조금 활동적" },
                { value: "MEDIUM", label: "활동적" },
                { value: "HIGH", label: "매우 활동적" },
              ]}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              키 (cm)
            </label>
            <FormInput
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="키를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              몸무게 (kg)
            </label>
            <FormInput
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="몸무게를 입력하세요"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
          >
            저장하기
          </button>
          <button
            type="button"
            onClick={() => navigate("/mypage/profile")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            메인으로
          </button>
        </div>
      </form>
    </div>
  );
}
