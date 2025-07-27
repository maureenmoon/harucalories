import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  setUserData,
  setAccessToken,
  setRefreshToken,
  removeAllAppCookies,
  removeUserData,
  hasValidTokens,
  calculateRecommendedCalories,
  setTodayCalories,
  setTodayNutrients,
  setMealData,
} from "../utils/cookieUtils";

// Check for existing user data (cookie-based)
const storeUser = getUserData();
const hasTokens = hasValidTokens();

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
  isLoggedIn: !!(storeUser && hasTokens),
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

      // Calculate recommended calories based on user data
      const recommendedCalories = calculateRecommendedCalories(updatedUser);
      updatedUser.recommendedCalories = recommendedCalories;

      // Store comprehensive user data in cookies
      setUserData(updatedUser);

      // Store tokens in cookies if provided
      if (action.payload.accessToken) {
        setAccessToken(action.payload.accessToken);
      }
      if (action.payload.refreshToken) {
        setRefreshToken(action.payload.refreshToken);
      }

      // Initialize today's data if not exists
      setTodayCalories(0);
      setTodayNutrients({ carbs: 0, protein: 0, fat: 0 });
      setMealData([]);

      return {
        isLoggedIn: true,
        user: updatedUser,
      };
    },
    logout: () => {
      // Clear all app data from cookies
      removeAllAppCookies();
      return {
        isLoggedIn: false,
        user: { ...emptyUser },
      };
    },
    editProfile: (state, action) => {
      const updatedUser = { ...state.user, ...action.payload };

      // Recalculate recommended calories when profile is updated
      const recommendedCalories = calculateRecommendedCalories(updatedUser);
      updatedUser.recommendedCalories = recommendedCalories;

      state.user = updatedUser;

      // Update cookies when profile is edited
      setUserData(updatedUser);
    },
    updatePhoto: (state, action) => {
      state.user.photo = action.payload;
      // Update cookies when photo is updated
      setUserData(state.user);
    },
    setNickname: (state, action) => {
      state.user.nickname = action.payload;
      // Update cookies when nickname is updated
      setUserData(state.user);
    },
    updateTodayCalories: (state, action) => {
      // This will be handled by the meal tracking system
      // The actual calorie data is stored in cookies
    },
    updateTodayNutrients: (state, action) => {
      // This will be handled by the meal tracking system
      // The actual nutrient data is stored in cookies
    },
  },
});

export const {
  login,
  logout,
  editProfile,
  updatePhoto,
  setNickname,
  updateTodayCalories,
  updateTodayNutrients,
} = loginSlice.actions;

export default loginSlice.reducer;
