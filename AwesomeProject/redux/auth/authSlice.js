import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  user: { login: null, email: null, password: null, avatar: null },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    registerUser(state, { payload }) {
      state.user.login = payload.login;
      state.user.email = payload.email;
      state.user.password = payload.password;
      state.user.avatar = payload.avatar;
    },
    logIn(state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    signOut: () => authInitialState,
  },
});

export const { registerUser, logIn, signOut } = authSlice.actions;
