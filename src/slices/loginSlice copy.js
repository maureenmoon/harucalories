// state.loginSlice.user로 변경해서 사용요망( 기존방식은  state.loginSlice)
//Easier to manage user state in a single object.
//Clean separation of global flags (like isLoggedIn) from user info.
//Matches real-world patterns used in larger apps.

import { createSlice } from "@reduxjs/toolkit";

// existing user 기존 사용자 로그인
// const initState = {
//   isLoggedIn: true,
//   user: {
//     email: "susiemoon@naver.com",
//     nickname: "toby",
//     userid: 3,
//     name: "문연순",
//     height: 156,
//     weight: 57,
//     targetCalories: null,
//     activityLevel: "활동적",
//     role: "admin",
//     photo: "",
//   },
// };

//Step 1: Redux
//new user 새로운 사용자
const initState = {
  isLoggedIn: false,
  user: {
    email: "",
    nickname: "",
    userid: null,
    name: "",
    height: null,
    weight: null,
    targetCalories: null,
    activityLevel: "",
    role: "admin",
    photo: "", //base64 or img URL
  },
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      state.user = { ...action.payload };
      state.isLoggedIn = true;
    },
    logout: () => initState,
    editProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updatePhoto: (state, action) => {
      state.user.photo = action.payload;
    },
    setNickname: (state, action) => {
      state.user.nickname = action.payload;
    },
  },
});

export const { login, logout, editProfile, updatePhoto, setNickname } =
  loginSlice.actions; //구조분해 할당
export default loginSlice.reducer; // clean default export
