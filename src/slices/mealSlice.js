import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMeal: null,
  mealRecords: [], // 식사 기록 배열 추가
  record: undefined, // 상세 식사 기록(상세 페이지용)
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setSelectedMeal: (state, action) => {
      state.selectedMeal = action.payload;
    },
    setMealRecords: (state, action) => {
      state.mealRecords = action.payload;
    },
    addMealRecord: (state, action) => {
      state.mealRecords.push(action.payload);
    },
    updateMealRecord: (state, action) => {
      const idx = state.mealRecords.findIndex(
        (r) => r.id === action.payload.id
      );
      if (idx !== -1) state.mealRecords[idx] = action.payload;
    },
    deleteMealRecord: (state, action) => {
      state.mealRecords = state.mealRecords.filter(
        (r) => r.id !== action.payload
      );
    },
    setRecord: (state, action) => {
      state.record = action.payload;
    },
  },
});

export const {
  setSelectedMeal,
  setMealRecords,
  addMealRecord,
  updateMealRecord,
  deleteMealRecord,
  setRecord,
} = mealSlice.actions;
export default mealSlice.reducer;
