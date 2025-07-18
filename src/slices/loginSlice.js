import { createSlice } from "@reduxjs/toolkit";

const emptyUser = {
  email: "",
  nickname: "",
  userid: null,
  name: "",
  height: null,
  weight: null,
  targetCalories: null,
  activityLevel: "",
  role: "",
  photo: "",
};

const initState = {
  isLoggedIn: false,
  user: { ...emptyUser },
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      return {
        isLoggedIn: true,
        user: { ...action.payload },
      };
    },
    logout: () => ({
      isLoggedIn: false,
      user: { ...emptyUser },
    }),
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
  loginSlice.actions;

export default loginSlice.reducer;
