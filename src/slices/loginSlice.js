import { createSlice } from "@reduxjs/toolkit";

const initState = {
  // email: "ttomi99@naver.com",
  nickname: "ansora17",
  userid: 1,
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
