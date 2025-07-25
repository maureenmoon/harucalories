import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../slices/loginSlice";
import { validateNickname, validatePassword } from "../../utils/auth/validatos";
import FormInput from "../../components/mypage/FormInput";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nickname: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateNickname(form.nickname)) {
      newErrors.nickname = "영어소문자 또는 숫자, 4~12자";
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "영어대문자,숫자,특수문자 포함, 4~20자";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.nickname === form.nickname && u.password === form.password
    );

    if (!foundUser) {
      alert("닉네임 또는 비밀번호가 잘못되었습니다.");
      return;
    }

    localStorage.setItem("loginUser", JSON.stringify(foundUser));
    dispatch(login(foundUser));

    alert(`${foundUser.nickname}님 환영합니다!`);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-24 px-4 bg-white">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <FormInput
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder="영어 소문자 또는 숫자, 4~12자"
            />
            {errors.nickname && (
              <p className="text-xs text-red-500 ml-1">{errors.nickname}</p>
            )}
          </div>

          {/* password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <FormInput
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="영어대문자,숫자,특수문자 포함, 4~20자"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            로그인
          </button>
        </form>

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
