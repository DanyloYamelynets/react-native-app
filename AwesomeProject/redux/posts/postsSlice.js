import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    loadPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    loadPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const { loadPostsStart, loadPostsSuccess, loadPostsFailure, addPost } =
  postSlice.actions;
