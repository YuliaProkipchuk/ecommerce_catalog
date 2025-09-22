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

const saveState = (state: CartState) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cartState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart state to localStorage:', error);
    }
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart: (state) => {
      if (typeof window !== 'undefined') {
        const savedCartState = localStorage.getItem('cartState');
        if (savedCartState) {
          try {
            const parsedState = JSON.parse(savedCartState);
            if (parsedState && Array.isArray(parsedState.items)) {
              state.items = parsedState.items;
            }
          } catch (error) {
            console.error('Error parsing cart state from localStorage:', error);
            localStorage.removeItem('cartState');
          }
        }
      }
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
      saveState(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.itemId !== action.payload);
      saveState(state);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item && item.quantity < 10) {
        item.quantity++;
        saveState(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        saveState(state);
      }
    },
  },
});

export const { initCart, addItem, removeItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
