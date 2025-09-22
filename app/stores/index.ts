import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import mainReducer from './slices/mainSlice';
import favouritesReducer from './slices/favouritesSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    main: mainReducer,
    cart: cartReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
