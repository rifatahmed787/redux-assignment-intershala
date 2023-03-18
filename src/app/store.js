import { configureStore } from "@reduxjs/toolkit";
import mentorSlice from "../features/mentorSlice/mentorSlice";

const store = configureStore({
  reducer: {
    mentors: mentorSlice,
  },
});

export default store;
