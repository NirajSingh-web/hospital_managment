import { createSlice } from "@reduxjs/toolkit";
const Roomslice = createSlice({
  name: "room",
  initialState: {},
  reducers: {
    getdata(state, action) {
      state.RoomNumber = action.payload.RoomNumber;
      state.RoomType = action.payload.RoomType;
      state.Patient_Name = action.payload.Patient_Name;
      state.Allotment_Date = action.payload.Allotment_Date;
      state.Discharge_Date = action.payload.Discharge_Date;
      state.Doctor_Name = action.payload.Doctor_Name;
      state._id = action.payload._id;
    },
  },
});
export default Roomslice.reducer;
export const { getdata } = Roomslice.actions;
