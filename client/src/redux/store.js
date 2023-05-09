import { configureStore } from "@reduxjs/toolkit";

import { postsReducer } from "./slices/post.js";
import { authReducer } from "./slices/auth.js";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
