import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMeal: null,
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setSelectedMeal: (state, action) => {
      state.selectedMeal = action.payload;
    },
  },
});

export const { setSelectedMeal } = mealSlice.actions;
export default mealSlice.reducer;
