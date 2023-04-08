import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import videosSliceReducer from "../features/videos/videoSlice";
import assignmentSliceReducer from "../features/assignment/assginmentSlice";
import steperSliceReducer from "../features/steper/steperSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    videos: videosSliceReducer,
    assignments: assignmentSliceReducer,
    steper: steperSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
