import { configureStore } from "@reduxjs/toolkit";
import { pyramidSlice } from "./store/pyramidSlice";
import { snackbarSlice } from "./store/snackbarSlice";

export const store = configureStore({
    reducer:{pyramidStore : pyramidSlice.reducer, snackbarStore: snackbarSlice.reducer},
});