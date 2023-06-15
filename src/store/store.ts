import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import ContractReducer from './slices/contractSlice';
import modalReducer from './slices/modalSlice';
import RequestReducer from './slices/requestSlice';
import UserReducer from './slices/userSlice';

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['user'],
};

const rootReducer = combineReducers({
   contract: ContractReducer,
   modal: modalReducer,
   request: RequestReducer,
   user: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
export const persistor = persistStore(store);
