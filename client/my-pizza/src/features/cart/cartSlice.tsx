import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface cart {
  value: number;
}

const initialState:cart = {
  value: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log("before: ",state.value)
      state.value += action.payload;
      console.log("after: ",state.value)
    },
    deccrementByAmount: (state, action: PayloadAction<number>) => {
      console.log("before: ",state.value)
      state.value -= action.payload;
      console.log("after: ",state.value)
    },
    resetTotal: (state) => {
      console.log("before", state)
      state.value = 0;
      console.log("after: ", state)
    }
  }
})

export const {incrementByAmount, deccrementByAmount, resetTotal} = cartSlice.actions;

export const cartSelector = (state: RootState) => state.persistedReducer.value

export default cartSlice.reducer