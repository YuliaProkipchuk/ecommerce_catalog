import {Product} from '../../types/product'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getProducts} from "@/app/helpers/products/getProducts";

interface ProductState {
    products: Product[]
    clearProduts: Product[]
    loading: boolean;
    error: string | null;
    countItemsPage: number
}

const initialState: ProductState = {
    products: [],
    clearProduts: [],
    loading: false,
    error: null,
    countItemsPage: 10
}

export const getProductsStore = createAsyncThunk('products/get', async () => {
    return await getProducts()
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getPagProducts(state: ProductState) {
            if (state.clearProduts.length === 0 || state.clearProduts.length === state.products.length) return;
            state.products = [
                ...state.products,
                ...state.clearProduts.slice(state.products.length, state.products.length + state.countItemsPage),
            ];
        },
        changeCountItems(state: ProductState, action: PayloadAction<number>) {
            if (action.payload < 10) {
                state.countItemsPage = 10;
                return
            }
            state.countItemsPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsStore.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getProductsStore.fulfilled, (state, action) => {
            state.clearProduts = action.payload;
            state.products = state.clearProduts.slice(0, state.countItemsPage);
            state.loading = false;
        }).addCase(getProductsStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error';
        })
    }
})
export const {getPagProducts, changeCountItems} = productSlice.actions;
export default productSlice.reducer