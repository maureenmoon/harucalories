import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/loginSlice";
import { validateEmail, validatePassword } from "../../utils/auth/validatos";
import FormInput from "../../components/mypage/FormInput";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(form.email))
      return alert("이메일 형식이 잘못되었습니다.");
    if (!validatePassword(form.password))
      return alert("비밀번호 형식이 잘못되었습니다.");

    // Temporary: mock user info
    const mockUser = {
      email: form.email,
      nickname: "toby",
      userid: 1,
      name: "문연순",
      height: 160,
      weight: 55,
      targetCalories: 2100,
      activityLevel: "활동적",
      photo: "",
    };

    dispatch(login(mockUser));
    navigate("/");
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-24 px-4 bg-white">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <FormInput
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일"
          />
          <FormInput
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
