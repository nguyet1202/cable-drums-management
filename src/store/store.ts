import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from './slices/userSlice';
import AuthReducer from "./slices/authSlice";
import ModalReducer from "./slices/modalSlice";
import ContractReducer from "./slices/contractSlice";
import RequestReducer from "./slices/requestSlice";

const reducer = combineReducers({
   auth: AuthReducer,
   user: UserReducer,
   modal: ModalReducer,
   contract:ContractReducer,
   request:RequestReducer,
});

const persistConfig = {
   key: "root",
   storage,
   whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: [thunk],
});

export default store;
export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
