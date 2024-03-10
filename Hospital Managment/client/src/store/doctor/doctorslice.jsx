import { createSlice } from "@reduxjs/toolkit";
const doctorslice = createSlice({
  name: "Doctor",
  initialState: {},
  reducers: {
    adddoctor(state, action) {
      state["_id"] = action.payload["_id"];
      state["age"] = action.payload["age"];
      state["gender"] = action.payload["gender"];
      state["Name"] = action.payload["Name"];
      state["experience"] = action.payload["experience"];
      state["specialization"] = action.payload["specialization"];
      state["address"] = action.payload["address"];
      state["doctordetail"] = action.payload["doctordetail"];
      state["dob"] = action.payload["dob"];
      state["email"] = action.payload["email"];
      state["phone"] = action.payload["phone"];
    },
  },
});
export default doctorslice.reducer;
export const { adddoctor } = doctorslice.actions;
