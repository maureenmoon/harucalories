import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slices/loginSlice";
import mealSlice from "../slices/mealSlice";

const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    meal: mealSlice.reducer,
  },
});

export default store;
