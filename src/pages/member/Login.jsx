import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/loginSlice";

const init = {
  email: "",
  password: "",
};

function Login() {
  const [loginParam, setLoginParam] = useState({ ...init });

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginParam({ ...loginParam, [name]: value });
  };

  // const handleSubmit = (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 정보 : ", loginParam);
    // dispatch(login(loginParam));

    //✅ replace this block with actual API call
    //const response = awiat axios.post("api/login",loginParam)
    //dispatch(login(response.data))
    const mockUserDataFromApi = {
      userid: 1,
      email: loginParam.email,
      nickname: "sora17",
      name: "안소라",
      height: 163,
      weight: 55,
      targetCalories: 2100,
      activityLevel: "medium",
      photo: "", // or URL
    };
    dispatch(login(mockUserDataFromApi));
    // Navigate("/");

    //mock testing
    Navigate("/mypage/profile");
  };

  return (
    <div className="bg-blue-200 h-[calc(100vh-56px)] flex justify-center items-center px-4">
      <div className="w-full sm:w-100 hidden sm:block   bg-gray-200 px-6 py-8 rounded-3xl shadow-2xl">
        <h3 className="text-3xl font-bold mb-4">Login</h3>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">이메일</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="이메일입력"
            name="email"
            onChange={handleChange}
            value={loginParam?.email}
          />
        </fieldset>
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend ">비밀번호</legend>
          <input
            type="password"
            className="input w-full"
            placeholder="패스워드입력"
            name="password"
            onChange={handleChange}
            value={loginParam?.password}
          />
        </fieldset>
        <button className="btn btn-primary w-full mb-4" onClick={handleSubmit}>
          {" "}
          로그인
        </button>

        <div className="flex justify-between ">
          <div className="text-sm text-gray-600">아이디/비밀번호찾기</div>
          <div className="text-sm text-gray-600">
            <Link to="../signup">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
