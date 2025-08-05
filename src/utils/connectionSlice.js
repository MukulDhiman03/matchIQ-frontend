import { createSlice } from "@reduxjs/toolkit";

const connectionSice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connectionSice.actions;
export default connectionSice.reducer;
