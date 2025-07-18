import React, { useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "../../utils/auth/validatos";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/mypage/FormInput";
import FormSelect from "../../components/mypage/FormSelect";
import calculateCalories from "../../components/mypage/calculateCalories";

export default function Signup() {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [calories, setCalories] = useState(0);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    birthAt: "",
    gender: "여성",
    height: "",
    weight: "",
    activityLevel: "활동적",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!validatePassword(form.password)) {
      newErrors.password =
        "비밀번호는 영어대문자,숫자,특수문자를 포함한 4~20자입니다.";
    }
    if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!validateNickname(form.nickname)) {
      newErrors.nickname = "닉네임은 영어 소문자 또는 숫자, 4~12자입니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const duplicate = users.find(
      (u) => u.email === form.email || u.nickname === form.nickname
    );
    if (duplicate) {
      alert("이미 사용 중인 이메일 또는 닉네임입니다.");
      return;
    }

    setStep(2);
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    const { birthAt, gender, activityLevel, height, weight } = form;
    if (!birthAt || !gender || !activityLevel || !height || !weight) {
      return alert("모든 정보를 정확히 입력해주세요.");
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const { passwordConfirm, ...formData } = form;

    const newUser = {
      ...formData,
      userid: Date.now(),
      photo: "", //default profile image
      role: "user", //force role
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loginUser", JSON.stringify(newUser)); // will match loginSlice.user

    const dailyCalories = calculateCalories(newUser);
    localStorage.setItem("dailyCalories", dailyCalories);
    localStorage.setItem("nickname", newUser.nickname);

    setCalories(dailyCalories);
    setIsComplete(true);
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-20 bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        {isComplete ? (
          <ConfirmationScreen name={form.name} calories={calories} />
        ) : step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
            <form onSubmit={handleSubmitStep1} className="space-y-4">
              <div>
                <label className="text-sm font-medium">이메일</label>
                <FormInput
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">비밀번호</label>
                <FormInput
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="영어대문자,숫자,특수문자 포함 4~20자"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">비밀번호 확인</label>
                <FormInput
                  name="passwordConfirm"
                  type="password"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  placeholder="비밀번호 확인"
                />
                {errors.passwordConfirm && (
                  <p className="text-xs text-red-500">
                    {errors.passwordConfirm}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">닉네임</label>
                <FormInput
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                  placeholder="영어 소문자, 숫자, 4~12자"
                />
                {errors.nickname && (
                  <p className="text-xs text-red-500">{errors.nickname}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">이름</label>
                <FormInput
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="이름"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                다음
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              추가 정보 입력
            </h2>
            <form onSubmit={handleSubmitFinal} className="space-y-4">
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
                name="birthAt"
                type="date"
                value={form.birthAt}
                onChange={handleChange}
                placeholder="생년월일"
              />
              <FormSelect
                name="activityLevel"
                value={form.activityLevel}
                onChange={handleChange}
                options={[
                  { value: "HIGH", label: "매우 활동적" },
                  { value: "MEDIUM", label: "활동적" },
                  { value: "LOW", label: "낮음" },
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

const ConfirmationScreen = ({ name, calories }) => {
  const navigate = useNavigate();
  const handleStart = () => navigate("/");

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-bold">스마트한 다이어트 시작!</h2>
      <p className="text-lg">
        안녕하세요, <strong>{name} 님</strong>
      </p>
      <div className="bg-gray-100 p-4 rounded shadow">
        <span className="text-lg">목표 kcal</span>
        <span className="text-3xl font-bold text-red-500 ml-2">{calories}</span>
      </div>
      <p>
        하루 칼로리를 통해
        <br />
        성공적인 다이어트에 도전해 보세요
      </p>
      <button
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        onClick={handleStart}
      >
        하루칼로리 시작하기
      </button>
    </div>
  );
};
