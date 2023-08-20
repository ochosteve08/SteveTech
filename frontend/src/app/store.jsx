import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devtools:true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)

})


export default store