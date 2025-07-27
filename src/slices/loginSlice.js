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

const initState = {
  isLoggedIn: !!(storeUser && hasTokens),
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
