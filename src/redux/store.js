import { configureStore } from "@reduxjs/toolkit";
import squadReducer from "./squadSlice";

// Global Redux Store creatre kar rhe hain
export const store = configureStore({
  reducer: {
    squad: squadReducer, // Humne apni squadSlice ko register kr diya hai
  },
});
