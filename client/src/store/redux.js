import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import userSlice from './user/userSlice';

const commonConfig = {
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token', 'current', 'currentCart'],
  key: 'shop/user',
}
const productConfig = {
  ...commonConfig,
  whitelist: ['dealyDailay'],
  key: 'shop/deal',
}
export const store = configureStore({
  reducer: {
    app: appSlice,
    products: persistReducer(productConfig, productSlice),
    user: persistReducer(userConfig, userSlice )
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);