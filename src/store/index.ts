import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import pollReducer from './pollSlice';
import formReducer from './formSlice';

import { enableMapSet } from 'immer';
enableMapSet();

const rootReducer = combineReducers({
  poll: pollReducer,
  form: formReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['poll'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
