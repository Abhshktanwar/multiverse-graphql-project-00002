import { createSlice } from "@reduxjs/toolkit";

const squadSlice = createSlice({
  name: "squad",
  // Initial state: Shuru main squad khali hai
  initialState: {
    members: [],
  },
  reducers: {
    // 1. Squad mein character add karne ka action
    addToSquad: (state, action) => {
      const character = action.payload;
      // Duplicate chck: kya charcter pehle se squad mein hai?
      const exists = state.members.find((item) => item.id === character.id);
      if (!exists) {
        state.members.push(character);
      }
    },

    // 2. Squad se character remove karne ka action
    removeFromSquad: (state, action) => {
      const idToRemove = action.payload;
      // JavaScript Revision: Array .filter() se item remove karna
      state.members = state.members.filter((item) => item.id !== idToRemove);
    },
  },
});

// Actions export kar rhe hain  (components mein button click par dispatch krne ke liye)

export const { addToSquad, removeFromSquad } = squadSlice.actions;

// Reducer export kar rahe hain (store mein register karne ke liye)
export default squadSlice.reducer;
