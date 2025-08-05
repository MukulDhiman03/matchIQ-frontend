import { createSlice } from "@reduxjs/toolkit";

const feedSLice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed } = feedSLice.actions;
export default feedSLice.reducer;
