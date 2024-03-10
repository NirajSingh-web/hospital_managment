import { createSlice } from "@reduxjs/toolkit";
const patientSlice = createSlice({
  name: "patient",
  initialState: {},
  reducers: {
    Editpatient(state, action) {
      state["Name"] = action.payload["Name"];
      state["age"] = action.payload["age"];
      state["address"] = action.payload["address"];
      state["dob"] = action.payload["dob"];
      state["gender"] = action.payload["gender"];
      state["phone"] = action.payload["phone"];
      state["email"] = action.payload["email"];
      state["_id"] = action.payload["_id"];
    },
  },
});
export default patientSlice.reducer;
export const { Editpatient } = patientSlice.actions;
export const { RemovePatient } = patientSlice.actions;
