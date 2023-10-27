import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import userSlice from "./userSlice";
import ticketSlice from "./ticketSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    user: userSlice,
    ticket: ticketSlice,
  },
});
