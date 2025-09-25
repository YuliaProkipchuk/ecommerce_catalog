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


const saveState = (state: CheckoutFormState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('checkoutForm', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const initialState: CheckoutFormState = {
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
    initForm: (state) => {
      if (typeof window === "undefined") return;
      const initFormLocal: null | string = localStorage.getItem('checkoutForm');
      if (initFormLocal) {
        const data: CheckoutFormState = JSON.parse(initFormLocal);
        state.mobilePhone = data.mobilePhone;
        state.email = data.email;
        state.name = data.name;
        state.surname = data.surname;
        state.town = data.town;
        state.oblast = data.oblast;
        state.address = data.address;
      }
    },
    setFormField: (
      state,
      action: PayloadAction<{ field: keyof CheckoutFormState; value: string }>,
    ) => {
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

export const { setFormField, resetForm, initForm } = checkoutFormSlice.actions;
export default checkoutFormSlice.reducer;
