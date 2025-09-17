import {Product} from '../../types/product'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProducts} from "@/app/helpers/products/getProducts";
interface ProductState  {
    products: Product[]
    loading: boolean;
    error: string | null;
}
const initialState:ProductState = {
    products: [],
    loading: false,
    error: null
}

export const getProductsStore = createAsyncThunk('products/get',async () => {
    return await getProducts()
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsStore.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getProductsStore.fulfilled, (state,action) => {
            state.products = action.payload;
            state.loading = false;
        }).addCase(getProductsStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error';
        })
    }
})

export default productSlice.reducer