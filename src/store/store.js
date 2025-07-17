import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import mealReducer from "../slices/mealSlice";

const store = configureStore({
  reducer: {
    // loginSlice: loginSlice.reducer,//⛔ not ideal if components use state.login
    login: loginReducer, // clean naming
    meal: mealReducer,
  },
  // ✅ Enable Redux DevTools (optional in dev mode, but explicit is better)
  devTools: process.env.NODE_ENV !== "production",
});

console.log("Configured store with reducers:", store.getState());

export default store;
