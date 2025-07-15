import React, { useState } from "react";
import { checkDuplication, signup } from "../../assets/api/auth/signupApi";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "../../utils/auth/validatos";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

export default function Signup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isComplete, setIsComplete] = useState(false); //Hooks must be called inside the comp
  const [calories, setCalories] = useState(0);
  const [step, setStep] = useState(1); // 1: basic info, 2: extra info

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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
      setStep(2);
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
      const dailyCalories = calculateCalories(form);
      setCalories(dailyCalories);

      //dispatch to redux
      dispatch(
        login({
          email: form.email,
          // password: form.password, // optional
          nickname: form.nickname,
          name: form.name,
          birthAt: form.birthAt,
          gender: form.gender,
          height: parseFloat(form.height),
          weight: parseFloat(form.weight),
          activityLevel: form.activityLevel,
          targetCalories: dailyCalories,
          photo: "", // if photo uploading is added later
        })
      );

      //save globally until bk-end is ready
      localStorage.setItem("dailyCalories", dailyCalories);
      localStorage.setItem("nickname", form.nickname);

      setIsComplete(true);
      // setTimeout(() => navigate("/"), 800);//redirect to main page in 0.8sec
      console.log(result);
    } catch (err) {
      alert("서버 오류 또는 잘못된 입력입니다.");
      console.log(err);
    }
  };

  const calculateCalories = ({
    birthAt,
    gender,
    height,
    weight,
    activityLevel,
  }) => {
    const birthDate = new Date(birthAt);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    const h = parseFloat(height);
    const w = parseFloat(weight);
    let bmr;
    if (gender === "남성" || gender === "MALE") {
      bmr = 10 * w + 6.25 * h - 5 * age + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * age - 161;
    }
    let activityFactor = 1.55;
    if (activityLevel === "조금 활동적" || activityLevel === "LOW")
      activityFactor = 1.375;
    else if (activityLevel === "매우 활동적" || activityLevel === "HIGH")
      activityFactor = 1.725;

    return Math.round(bmr * activityFactor);
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
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일"
              />
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호"
              />
              <Input
                name="passwordConfirm"
                type="password"
                value={form.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호 확인"
              />
              <Input
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                placeholder="닉네임"
              />
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                가입하기
              </button>
            </form>
          </>
        ) : (
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
                value={form.birthAt}
                onChange={handleChange}
                placeholder="생년월일"
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
                value={form.height}
                onChange={handleChange}
                placeholder="키 (cm)"
              />
              <Input
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

// Confirmation Screen
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
