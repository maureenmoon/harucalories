import React, { useState } from "react";
import { checkDuplication, signup } from "../../assets/api/auth/signupApi";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "../../utils/auth/validatos";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
    name: "",
    birthAt: "",
    gender: "FEMALE",
    height: "",
    weight: "",
    activityLevel: "MEDIUM",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCheckDuplication = async () => {
    try {
      const res = await checkDuplication(form.email, form.nickname);
      alert("사용가능한 이메일과 닉네임입니다");
    } catch (err) {
      alert("이미 사용중인 이메일/ 닉네임입니다");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email))
      return alert("올바른 이메일 형식을 사용하시기 바랍니다");
    if (!validatePassword(form.password))
      return alert("올바른 비밀번호 형식을 사용하시기 바랍니다");
    if (!validateNickname(form.nickname))
      return alert("올바른 닉네임 형식을 사용하시기 바랍니다");

    const dailyCalories = calculateCalories(form);
    console.log("Calculated daily calories : ", dailyCalories);

    try {
      const result = await signup(form);
      alert("회원가입에 성공하셨습니다. 메인 화면으로 이동합니다");
      console.log(result);
    } catch (error) {
      alert("필수 입력 정보를 모두 입력해주세요 ");
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="이메일" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input name="nickname" placeholder="Nickname" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="birthAt" type="date" onChange={handleChange} />
      <select name="gender" onChange={handleChange}>
        <option value="FEMALE">여성</option>
        <option value="MALE">남성</option>
      </select>
      <input name="height" placeholder="Height" onChange={handleChange} />
      <input name="weight" placeholder="Weight" onChange={handleChange} />
      <select name="activityLevel" onChange={handleChange}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button type="button" onClick={handleCheckDuplication}>
        이메일/닉네임 중복확인
      </button>
      <button type="submit">회원가입</button>
    </form>
  );
}
