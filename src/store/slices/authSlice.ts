import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
   isLoggedIn: boolean;
   isLoading: boolean;
};

const initialState: AuthState = {
   isLoggedIn: false,
   isLoading: false,
};

const AuthSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setLoading: (state, action) => {
         state.isLoading = action.payload;
      },
      setLoggedIn: (state, action) => {
         state.isLoggedIn = action.payload;
      },
   },
});

export const { setLoading, setLoggedIn} = AuthSlice.actions;

export default AuthSlice.reducer;
