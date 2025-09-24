import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutFormState {
  mobilePhone: string;
  email: string;
  name: string;
  surname: string;
  town: string;
  oblast: string;
  address: string;
}

const loadState = (): CheckoutFormState | undefined => {
  try {
    const serializedState = localStorage.getItem('checkoutForm');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

const saveState = (state: CheckoutFormState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('checkoutForm', serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const initialState: CheckoutFormState = loadState() || {
  mobilePhone: '+38',
  email: '',
  name: '',
  surname: '',
  town: '',
  oblast: '',
  address: '',
};

const checkoutFormSlice = createSlice({
  name: 'checkoutForm',
  initialState,
  reducers: {
    setFormField: (state, action: PayloadAction<{ field: keyof CheckoutFormState; value: string }>) => {
      state[action.payload.field] = action.payload.value;
      saveState(state);
    },
    resetForm: (state) => {
      state.mobilePhone = '+38';
      state.email = '';
      state.name = '';
      state.surname = '';
      state.town = '';
      state.oblast = '';
      state.address = '';
      saveState(state);
    },
  },
});

export const { setFormField, resetForm } = checkoutFormSlice.actions;
export default checkoutFormSlice.reducer;
