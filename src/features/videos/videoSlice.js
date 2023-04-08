import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    getVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { getVideos } = videosSlice.actions;
export default videosSlice.reducer;
