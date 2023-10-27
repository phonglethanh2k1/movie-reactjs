import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../utils/localService";

let initialState = {
  user: userLocalStorage.get(),
};

let userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      console.log(action);
    },
  },
});
export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
