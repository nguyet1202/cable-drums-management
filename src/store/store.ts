import { configureStore } from '@reduxjs/toolkit';
import ContractReducer from './slices/contractSlice';
import modalReducer from "./slices/modalSlice";
import RequestReducer from "./slices/requestSlice";

const store = configureStore({
   reducer: {
      contract: ContractReducer,
      modal: modalReducer,
      request:RequestReducer,
   },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
