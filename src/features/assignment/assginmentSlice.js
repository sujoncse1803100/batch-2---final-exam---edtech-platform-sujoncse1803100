import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    getAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const { getAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
