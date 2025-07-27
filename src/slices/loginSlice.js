import { createSlice } from "@reduxjs/toolkit";

//fix redux clean-up: re-login
const storeUser = JSON.parse(localStorage.getItem("user"));

const emptyUser = {
  email: "",
  nickname: "",
  memberId: null,
  name: "",
  height: null,
  weight: null,
  targetCalories: null,
  activityLevel: "",
  role: "",
  photo: "",
};

// 임시 테스트용 - DB의 실제 회원 정보
const testUser = {
  email: "test@example.com",
  nickname: "테스트사용자",
  userid: 1, // DB의 실제 memberId와 일치
  name: "홍길동",
  height: 170,
  weight: 70,
  targetCalories: 2000,
  activityLevel: "보통",
  role: "USER",
  photo: "",
};

const initState = {
  //   isLoggedIn: false, // 테스트용: 로그인 상태 false로 설정
  //   user: { ...emptyUser }, // 테스트용: 빈 사용자 정보 (API에서 하드코딩된 memberId 사용)

  isLoggedIn: !!storeUser,
  user: storeUser || { ...emptyUser },
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        isLoggedIn: true,
        user: updatedUser,
      };
    },
    logout: () => {
      // Clear ALL authentication data
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("loginUser"); // Remove legacy data too

      return {
        isLoggedIn: false,
        user: { ...emptyUser },
      };
    },
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
