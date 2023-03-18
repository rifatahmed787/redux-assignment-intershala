import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mentors: [],
  filters: {
    sortBy: null,
    category: null,
  },
};

const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {
    setMentors: (state, action) => {
      //   console.log(action);
      state.mentors = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters = { ...state.filters, sortBy: action.payload };
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
  },
});

export const { setMentors, setSortBy, setCategory } = mentorSlice.actions;

export default mentorSlice.reducer;
