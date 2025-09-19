import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import mainReducer from './slices/mainSlice';
export const store = configureStore({
  reducer: {
    products: productReducer,
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
