import { create } from "zustand";

const useMealStore = create((set) => ({
  selectedMeal: "",
  setSelectedMeal: (meal) => set({ selectedMeal: meal }),
}));

export default useMealStore;
