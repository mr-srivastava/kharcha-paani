import { configureStore } from '@reduxjs/toolkit';
import { GroupReducer } from 'src/components/CreateGroup/_reducer';

const store = configureStore({
  reducer: {
    group: GroupReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
