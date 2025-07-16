import { createSlice } from "@reduxjs/toolkit";

// existing user 기존 사용자 로그인
// const initState = {
//   email: "susiemoon@naver.com",
//   nickname: "toby",
//   userid: 3,
//   name: "문연순",
//   height: 156,
//   weight: 57,
//   targetCalories: null,
//   activityLevel: "활동적",
//   photo: "",
// };

//Step 1: Redux
//new user 새로운 사용자
const initState = {
  isLoggedIn: false,
  email: "",
  nickname: "",
  userid: null,
  name: "",
  height: null,
  weight: null,
  targetCalories: null,
  activityLevel: "",
  photo: "", //base64 or img URL
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      //try without mockdata
      // login: (state, action) => {
      //   console.log("login...", action.payload);
      //   return { ...state, ...action.payload }; //clean replacement

      //Redux
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    },
    logout: () => initState,

    // logout: (state, action) => {
    //   console.log("logout...");
    //   return initState;
    // },
    editProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    updatePhoto: (state, action) => {
      state.photo = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
  },
});

export const { login, logout, editProfile, updatePhoto, setNickname } =
  loginSlice.actions; //구조분해 할당
// export default loginSlice;
export default loginSlice.reducer; // ✅ clean default export
