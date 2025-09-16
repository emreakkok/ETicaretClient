import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../pages/counter/counterSlice";
import { cartSlice } from "../pages/counter/cartSlite";
import { authReducer } from "../pages/counter/authSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        cart: cartSlice.reducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch