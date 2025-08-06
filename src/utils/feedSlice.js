import { createSlice } from "@reduxjs/toolkit";

const feedSLice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArr = state.filter((user) => user._id !== action.payload);
      return newArr;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSLice.actions;
export default feedSLice.reducer;
