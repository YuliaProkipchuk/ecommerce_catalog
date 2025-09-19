import { Product } from '../../types/product';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '@/app/helpers/products/getProducts';
import { RootState } from '../index';
import { prepareData } from '@/app/helpers/products/filterAndSort';

export type SortBy = { param: keyof Product; order: 'asc' | 'desc' };

interface ProductState {
  products: Product[];
  clearProduts: Product[];
  loading: boolean;
  error: string | null;
  countItemsPage: number;
  category: string;
  sortBy: SortBy;
}

const initialState: ProductState = {
  products: [],
  clearProduts: [],
  loading: false,
  error: null,
  countItemsPage: 16,
  category: 'phones',
  sortBy: {
    param: 'year',
    order: 'desc',
  },
};

export const getProductsStore = createAsyncThunk('products/get', async () => {
  return await getProducts();
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    getCategoryProducts(state: ProductState, action: PayloadAction<string>) {
      if (!state.clearProduts.length) return;
      const category = action.payload;
      state.products = prepareData(state.clearProduts, category, state.sortBy).slice(
        0,
        state.countItemsPage,
      );
      state.category = category;
    },
    getPagProducts(state: ProductState, action: PayloadAction<string>) {
      if (state.clearProduts.length === 0 || state.clearProduts.length === state.products.length)
        return;
      state.products = [
        ...state.products,
        ...prepareData(state.clearProduts, action.payload, state.sortBy).slice(
          state.products.length,
          state.products.length + state.countItemsPage,
        ),
      ];
    },
    changeCountItems(state: ProductState, action: PayloadAction<number>) {
      if (action.payload < 10) {
        state.countItemsPage = 10;
        return;
      }
      state.countItemsPage = action.payload;
    },
    changeSortValue(state: ProductState, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsStore.fulfilled, (state, action) => {
        state.clearProduts = action.payload;
        state.products = state.clearProduts.slice(0, state.countItemsPage);
        state.loading = false;
      })
      .addCase(getProductsStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export const selectTotalByCategory = (category: string) => (state: RootState) =>
  state.products.clearProduts.filter((p) => p.category === category);
export const {
  getPagProducts,
  changeCountItems,
  getCategoryProducts,
  setCategory,
  changeSortValue,
} = productSlice.actions;
export default productSlice.reducer;
