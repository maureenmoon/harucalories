import { createSlice } from "@reduxjs/toolkit";

//기존 사용자 로그인
// const initState = {
//   // email: "ttomi99@naver.com",
//   nickname: "ansora17",
//   userid: 1,
// };

//new user 새로운 사용자
const initState = {
  email: "",
  nickname: "ansora17",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log("login...");
      console.log(action.payload.email, action.payload.password);
      state.email = action.payload.email;
    },
    logout: (state, action) => {
      console.log("logout...");
      return initState;
    },
  },
});

export default loginSlice;
export const { login, logout } = loginSlice.actions; //구조분해 할당
