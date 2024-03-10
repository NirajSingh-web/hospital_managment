import { createSlice } from "@reduxjs/toolkit";
const headerSlice = createSlice({
  name: "header-content",
  initialState: {},
  reducers: {
    headerdata(state, action) {
      state.pagetitle = action.payload.pagetitle;
      state.pagesubTitle = action.payload.pagesubTitle;
    },
  },
});
console.log(headerSlice.actions.initialState);
export default headerSlice.reducer;
export const { headerdata } = headerSlice.actions;
