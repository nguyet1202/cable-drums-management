import { configureStore } from '@reduxjs/toolkit';
import ContractReducer from './slices/contractSlice';
import modalReducer from "./slices/modalSlice";
import RequestReducer from "./slices/requestSlice";
import NotificationReducer from "./slices/notificationSlice";


const store = configureStore({
   reducer: {
      contract: ContractReducer,
      modal: modalReducer,
      request:RequestReducer,
      notification:NotificationReducer,
   },
});

export default store;
