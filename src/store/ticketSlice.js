import { createSlice } from "@reduxjs/toolkit";
import { listDsGheLocalStorage } from "../utils/localService";

let initialState = {
  ticket: listDsGheLocalStorage.get(),
};

let ticketSlice = createSlice({
  name: "ticketSlice",
  initialState,
  reducers: {
    setTicket: (state, action) => {
      state.ticket = action.payload;
      console.log(state);
    },
  },
});
export const { setTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
