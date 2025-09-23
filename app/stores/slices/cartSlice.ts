import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/types/product';

interface CartItem {
  itemId: string;
  quantity: number;
  product: Omit<Product, 'id' | 'year'>;
}

interface CartState {
  items: CartItem[];
  count: number;
}

const initialState: CartState = {
  items: [],
  count: 0,
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
              state.count = parsedState.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
            }
          } catch (error) {
            console.error('Error parsing cart state from localStorage:', error);
            localStorage.removeItem('cartState');
          }
        }
      }
    },
    addItem: (state, action: PayloadAction<Omit<Product, 'id' | 'year'>>) => {
      const existingItem = state.items.find((item) => item.itemId === action.payload.itemId);

      if (existingItem) {
        if (existingItem.quantity < 10) {
          existingItem.quantity++;
          state.count++;
        }
      } else {
        state.items.push({
          itemId: action.payload.itemId,
          quantity: 1,
          product: action.payload,
        });
        state.count++;
      }
      saveState(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex((item) => item.itemId === action.payload);
      if (itemIndex > -1) {
        const removedItemQuantity = state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
        state.count -= removedItemQuantity;
      }
      saveState(state);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item && item.quantity < 10) {
        item.quantity++;
        state.count++;
        saveState(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.count--; 
        saveState(state);
      }
    },
  },
});

export const { initCart, addItem, removeItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
