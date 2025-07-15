import { createSlice } from "@reduxjs/toolkit";

// existing user 기존 사용자 로그인
const initState = {
  email: "susiemoon@naver.com",
  nickname: "toby",
  userid: 3,
  name: "문연순",
  height: 156,
  weight: 57,
  targetCalories: null,
  activityLevel: "활동적",
  photo: "",
};

//new user 새로운 사용자
// const initState = {
//   email: "susiemoon@naver.com",
//   nickname: "",
//   userid: null,
//   name: "",
//   height: null,
//   weight: null,
//   targetCalories: null,
//   activityLevel: "",
//   photo: "", //base64 or img URL
// };

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    // login: (state, action) => {
    //   console.log("login...");
    //   console.log(action.payload.email, action.payload.password);
    //   state.email = action.payload.email;
    login: (state, action) => {
      console.log("login...", action.payload);
      return { ...state, ...action.payload }; //clean replacement
    },
    logout: (state, action) => {
      console.log("logout...");
      return initState;
    },
    editProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export default loginSlice;
export const { login, logout, editProfile } = loginSlice.actions; //구조분해 할당
