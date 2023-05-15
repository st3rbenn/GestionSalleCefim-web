import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import mainSliceReducer from './mainslice';

const persistConfig = {
  key: 'filrouge',
  storage: storage,
}

const persisted = persistReducer(persistConfig, mainSliceReducer);

export const store = configureStore({
  reducer: persisted,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store);

export const useAppThunkDispatch = () => useDispatch();