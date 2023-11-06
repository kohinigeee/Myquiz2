import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";
import loginUserSlice from "./loginUserSlice";

export const store = configureStore({
    reducer : {
        loginUser: loginUserSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;