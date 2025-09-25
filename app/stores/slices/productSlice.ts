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
import { getProductsSupaId } from '@/app/helpers/supabase/products/getProductId';
import { getProductsSupa } from '@/app/helpers/supabase/products/getProducts';
import { getOnlyProdSupaId } from '@/app/helpers/supabase/products/getOnlyProdSupaId';

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
  selectedProduct: FullProduct | null;
  selectedForCart: Product | null;
  searchQuery: string
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
  selectedForCart: null,
  selectedProduct: null,
  searchQuery: '',

};

export const getProductsStore = createAsyncThunk('products/get', async () => {
  return await getProductsSupa();
  // return await getProducts();
});
export const getProductById = createAsyncThunk(
  'products/getById',
  async ({ id, table }: { id: string | number; table: string }) => {
    return await getProductsSupaId(id, table);
  },
);
export const getProductByIdForCart = createAsyncThunk(
  'products/getByIdForCart',
  async (id:string) => {
    return await getOnlyProdSupaId(id);
  },
);
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
          // return await getFullProducts('tablets');
        }
        default: {
          return await getAcc();
          // return await getFullProducts('accesssories');
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
      state.searchQuery = '';
    },
    findById(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selectedProduct = state.fullProduct.find((p) => p.id === id) || null;
      state.selectedForCart = state.clearProduts.find((p) => p.itemId === id) || null;
    },
    getCategoryProducts(state: ProductState, action: PayloadAction<string>) {
      if (!state.clearProduts.length) return;
      const category = action.payload;
      state.products = prepareData(state.clearProduts, category, state.sortBy, state.searchQuery).slice(
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
        ...prepareData(state.clearProduts, action.payload, state.sortBy, state.searchQuery).slice(
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
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
      })
      .addCase(getCategoryFullProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload[0];
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
         .addCase(getProductByIdForCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByIdForCart.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedForCart = action.payload[0];
      })
      .addCase(getProductByIdForCart.rejected, (state, action) => {
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
  findById,
  setSearchQuery,
} = productSlice.actions;
export default productSlice.reducer;
