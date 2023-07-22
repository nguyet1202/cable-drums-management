import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState ={
   showModal: boolean;
}

const initialState: ModalState = {
   showModal: false,
};

const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      openModal: (state, action: PayloadAction<boolean>) => {
         state.showModal = action.payload;
      },
      closeModal: (state) => {
         state.showModal = false;
      },
   },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
