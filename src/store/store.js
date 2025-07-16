import { configureStore } from "@reduxjs/toolkit";
// import loginSlice from "../slices/loginSlice";
// import mealSlice from "../slices/mealSlice";
import loginReducer from "../slices/loginSlice";
import mealReducer from "../slices/loginSlice";

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
