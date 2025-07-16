import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../slices/loginSlice";
import FormInput from "../../components/mypage/FormInput";
import FormSelect from "../../components/mypage/FormSelect";
import calculateCalories from "../../components/mypage/calculateCalories";

export default function EditProfile() {
  const user = useSelector((state) => state.loginSlice);
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
    <div className="flex justify-center px-4 py-8 sm:px-8 lg:px-16">
      <div className="bg-white rounded-xl shadow-md w-full max-w-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">프로필 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
          />
          <FormInput
            name="birthAt"
            type="date"
            value={form.birthAt}
            onChange={handleChange}
            placeholder="생년월일"
          />
          <FormSelect
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={[
              { value: "FEMALE", label: "여성" },
              { value: "MALE", label: "남성" },
            ]}
          />
          <FormInput
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="키 (cm)"
          />
          <FormInput
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="몸무게 (kg)"
          />
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
        </form>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            type="submit"
            className=" px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            저장
          </button>
          <button
            onClick={() => navigate("/")}
            className=" py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
          >
            메인 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
