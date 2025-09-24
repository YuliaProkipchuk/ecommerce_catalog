import { Product } from '../../types/product';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '@/app/helpers/products/getProducts';
import { getProductsSupa } from '@/app/helpers/supabase/products/getProducts';

interface FavouritesState {
  // favouritesProducts: Product[];
  favouritesProducts: Omit<Product, 'id' | 'year'>[];
  count: number;
}

const initialState: FavouritesState = {
  favouritesProducts: [],
  count: 0,
};

export const getProductsStore = createAsyncThunk('products/get', async () => {
  return await getProducts();
});

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    initFavourites(state) {
      const dataFromStorage = localStorage.getItem('favourites');
      let initFavourites = [];
      if (dataFromStorage) {
        initFavourites = JSON.parse(dataFromStorage);
      }
      state.favouritesProducts = initFavourites;
      state.count = initFavourites.length;
    },
    // toggleFavourites(state: FavouritesState, action: PayloadAction<Product>) {
      toggleFavourites(state: FavouritesState, action: PayloadAction<Omit<Product, 'id' | 'year'>>) {
      const existingProduct = state.favouritesProducts.some(
        (p) => p.itemId === action.payload.itemId,
      );
      if (existingProduct) {
        state.favouritesProducts = state.favouritesProducts.filter(
          (p) => p.itemId !== action.payload.itemId,
        );
        state.count--;
      } else {
        state.favouritesProducts.push(action.payload);
        state.count++;
      }

      localStorage.setItem('favourites', JSON.stringify(state.favouritesProducts));
    },
  },
});

export const { initFavourites, toggleFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
