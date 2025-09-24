import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import mainReducer from './slices/mainSlice';
import favouritesReducer from './slices/favouritesSlice';
import authReducer from './slices/authSlice';

import cartReducer from './slices/cartSlice';
import checkoutFormReducer from './slices/checkoutFormSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    main: mainReducer,
    cart: cartReducer,
    favourites: favouritesReducer,
    auth: authReducer,
    checkoutForm: checkoutFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
