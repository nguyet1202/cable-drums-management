import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserData = {
   uid: string;
   name: string;
   email: string;
   teamID?: string;
   role: string;
};

const initialUserData: UserData = {
   uid: '',
   name: '',
   email: '',
   teamID: '',
   role: '',
};

type UserState = {
   data: UserData;
};

const initialState: UserState = {
   data: initialUserData,
};

const UserSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setDataUser: (state, action: PayloadAction<UserData>) => {
         state.data = action.payload;
      },
   },
});

export const { setDataUser } = UserSlice.actions;

export default UserSlice.reducer;
