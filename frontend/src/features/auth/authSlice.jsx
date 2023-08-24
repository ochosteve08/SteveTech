/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';


const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, isLoggingOut: false },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logout: (state, action) => {
      state.token = null;
    },
    startLogout: (state) => {
      state.isLoggingOut = true;
    },
    endLogout: (state) => {
      state.isLoggingOut = false;
    },
  },
});

export const { startLogout, endLogout, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state)=> state.auth.token