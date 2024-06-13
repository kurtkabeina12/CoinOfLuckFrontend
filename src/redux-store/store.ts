import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  username: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string; username: string }>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    clearUser: (state) => {
      state.userId = null;
      state.username = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUserId = (state: { user: UserState }) => state.user.userId;
export const selectUsername = (state: { user: UserState }) => state.user.username;

export const userReducer = userSlice.reducer;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
