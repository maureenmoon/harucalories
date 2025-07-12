import React, { useState } from "react";
import { checkDuplication, signup } from "../../assets/api/auth/signupApi";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "../../utils/auth/validatos";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: basic info, 2: extra info

  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
    name: "",
    birthAt: "",
    gender: "여성",
    height: "",
    weight: "",
    activityLevel: "활동적",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email))
      return alert("올바른 이메일 형식을 입력해주세요.");
    if (!validatePassword(form.password))
      return alert("비밀번호 형식이 유효하지 않습니다.");
    if (form.password !== form.passwordConfirm)
      return alert("비밀번호가 일치하지 않습니다.");
    if (!validateNickname(form.nickname))
      return alert("닉네임 형식이 유효하지 않습니다.");

    try {
      await checkDuplication(form.email, form.nickname);
      setStep(2); // Move to next step
    } catch (err) {
      alert("이미 사용 중인 이메일 또는 닉네임입니다.");
    }
  };

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    const { birthAt, gender, activityLevel, height, weight } = form;
    if (!birthAt || !gender || !activityLevel || !height || !weight) {
      return alert("모든 정보를 정확히 입력해주세요.");
    }

    try {
      const result = await signup(form);
      alert("회원가입이 완료되었습니다!");
      setTimeout(() => navigate("/"), 800); //redirect to main page in 0.8sec
      console.log(result);
    } catch (err) {
      alert("서버 오류 또는 잘못된 입력입니다.");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-20 bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shasow-md p-6 sm:p-8">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
            <form onSubmit={handleSubmitStep1} className="space-y-4">
              <Input
                name="email"
                placeholder="이메일"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                name="password"
                type="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={handleChange}
              />
              <Input
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                value={form.passwordConfirm}
                onChange={handleChange}
              />
              <Input
                name="nickname"
                placeholder="닉네임"
                value={form.nickname}
                onChange={handleChange}
              />
              <Input
                name="name"
                placeholder="이름"
                value={form.name}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                가입하기
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              추가 정보 입력
            </h2>
            <form onSubmit={handleSubmitFinal} className="space-y-4">
              <Select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={[
                  { value: "FEMALE", label: "여성" },
                  { value: "MALE", label: "남성" },
                ]}
              />
              <Input
                name="birthAt"
                type="date"
                placeholder="생년월일"
                value={form.birthAt}
                onChange={handleChange}
              />
              <Select
                name="activityLevel"
                value={form.activityLevel}
                onChange={handleChange}
                options={[
                  { value: "HIGH", label: "매우 활동적" },
                  { value: "MEDIUM", label: "활동적" },
                  { value: "LOW", label: "낮음" },
                ]}
              />
              <Input
                name="height"
                placeholder="키 (cm)"
                value={form.height}
                onChange={handleChange}
              />
              <Input
                name="weight"
                placeholder="몸무게 (kg)"
                value={form.weight}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                저장
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Reusable Input
const Input = ({ name, type = "text", placeholder, value, onChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

// Reusable Select
const Select = ({ name, value, onChange, options }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
// Stub function (you can replace it later)
const calculateCalories = (form) => {
  return 2000; // placeholder
};
