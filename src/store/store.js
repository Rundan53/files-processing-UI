import { configureStore } from "@reduxjs/toolkit";
import { templateApi } from "./apiSlice/templateApi";
import { authApi } from "./apiSlice/authApi";
import authSlice from "./reducerSlice/authSlice";
import { clientApi } from "./apiSlice/clientApi";

export const Store = configureStore({
  reducer:{
    [templateApi.reducerPath] : templateApi.reducer,
    [authApi.reducerPath] : authApi.reducer,
    [authSlice.name] : authSlice.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware:(defaultMiddleware)=> [...defaultMiddleware(), authApi.middleware, templateApi.middleware, clientApi.middleware],
})