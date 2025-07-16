import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/loginSlice";
import { validateEmail, validatePassword } from "../../utils/auth/validatos";
import FormInput from "../../components/mypage/FormInput";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nickname: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateNick(form.nickname))
      return alert("닉네임 형식이 잘못되었습니다.");
    if (!validatePassword(form.password))
      return alert("비밀번호 형식이 잘못되었습니다.");

    // mock - Replace this with real API response when ready
    const mockUser = {
      nickname: form.nickname,
      email: "susiemoon@naver.com",
      userid: 3,
      name: "문연순",
      height: 156,
      weight: 57,
      targetCalories: 1800,
      activityLevel: "활동적",
      photo: "",
    };

    dispatch(login(mockUser)); //DISPATCH FULL USER OBJECT HERE

    // Replace mock part with API data
    // const response = await loginApi(email, password); // ← your login API call
    // dispatch(login(response.data)); // assuming response.data contains full user info

    navigate("/");
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-24 px-4 bg-white">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <FormInput
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임"
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
        {/* Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <Link to="/member/search-nickname" className="hover:underline">
            닉네임 찾기
          </Link>
          <Link to="/member/reset-password" className="hover:underline">
            비밀번호 변경
          </Link>
          <Link to="/member/signup" className="hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
