import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import mainReducer from './slices/mainSlice';
import cartReducer, { addItem, removeItem, incrementQuantity, decrementQuantity, setCartItems } from './slices/cartSlice';

// const localStorageMiddleware = createListenerMiddleware();

// localStorageMiddleware.startListening({
//   matcher: isAnyOf(addItem, removeItem, incrementQuantity, decrementQuantity, setCartItems),
//   effect: (action, listenerApi) => {
//     localStorage.setItem('cartState', JSON.stringify((listenerApi.getState() as RootState).cart));
//   },
// });

export const store = configureStore({
  reducer: {
    products: productReducer,
    main: mainReducer,
    cart: cartReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
});

// const loadInitialCartState = () => {
//   try {
//     const serializedState = localStorage.getItem('cartState');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Error loading cart state from localStorage:', error);
//     return undefined;
//   }
// };

// const preloadedCartState = loadInitialCartState();
// if (preloadedCartState) {
//   store.dispatch(setCartItems(preloadedCartState.items));
// }

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
