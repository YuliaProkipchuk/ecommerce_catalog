import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/types/product';

interface CartItem {
  itemId: string;
  quantity: number;
  product: Product;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.itemId === action.payload.itemId
      );

      if (existingItem) {
        if (existingItem.quantity < 10) {
          existingItem.quantity++;
        }
      } else {
        state.items.push({
          itemId: action.payload.itemId,
          quantity: 1,
          product: action.payload,
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.itemId !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item && item.quantity < 10) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, setCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
