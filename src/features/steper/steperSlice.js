import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  showOption: false,
  quiz: { options: [] },
};

const steperSlice = createSlice({
  name: "steper",
  initialState,
  reducers: {
    setCurrentStep: (state) => {
      state.currentStep += 1;
    },
    setShowOption: (state) => {
      state.showOption = !state.showOption;
    },
    addOption: (state, action) => {
      state.quiz.options.push(action.payload);
    },
    addQuizData: (state, action) => {
      state.quiz = action.payload;
    },
    setState: (state) => {
      state.currentStep = 0;
      state.showOption = false;
      state.quiz = { options: [] };
    },
  },
});

export const {
  setCurrentStep,
  setShowOption,
  addOption,
  addQuizData,
  setState,
} = steperSlice.actions;
export default steperSlice.reducer;
