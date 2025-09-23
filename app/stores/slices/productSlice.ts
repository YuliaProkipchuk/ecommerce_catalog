import { Product } from '../../types/product';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '@/app/helpers/products/getProducts';
import { RootState } from '../index';
import { prepareData } from '@/app/helpers/products/filterAndSort';
import { FullProduct } from '@/app/types/fullProduct';
import { getFullProducts } from '@/app/helpers/products/getFullProduct';
import { getPhones } from '@/app/helpers/supabase/products/phones';
import { getTablets } from '@/app/helpers/supabase/products/getTablets';
import { getAcc } from '@/app/helpers/supabase/products/getAcc';

export type SortBy = { param: keyof Product; order: 'asc' | 'desc' };

interface ProductState {
  products: Product[];
  clearProduts: Product[];
  loading: boolean;
  error: string | null;
  countItemsPage: number;
  category: string;
  sortBy: SortBy;
  fullProduct: FullProduct[];
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
  fullProduct: [],
};

export const getProductsStore = createAsyncThunk('products/get', async () => {
  return await getProducts();
});

export const getCategoryFullProducts = createAsyncThunk(
  'products/getFullCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      switch (category) {
        case 'phones': {
          return await getPhones();
          // return await getFullProducts('phones');

        }
        case 'tablets': {
          return await getTablets();
        }
        default: {
          return await getAcc();
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
      })
      .addCase(getCategoryFullProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryFullProducts.fulfilled, (state, action: PayloadAction<FullProduct[]>) => {
        state.loading = false;
        state.fullProduct = action.payload;
        console.log(action.payload)
      })
      .addCase(getCategoryFullProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
