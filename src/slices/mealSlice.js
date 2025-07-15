import { createSlice } from "@reduxjs/toolkit";

const mealSlice = createSlice({
  name: "meal",
  initialState: {
    selectedMeal: "",
  },
  reducers: {
    setSelectedMeal: (state, action) => {
      state.selectedMeal = action.payload;
    },
  },
});

export const { setSelectedMeal } = mealSlice.actions;
export default mealSlice;
