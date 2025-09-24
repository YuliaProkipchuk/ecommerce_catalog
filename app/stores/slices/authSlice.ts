import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/types/product';
import { Session } from '@supabase/supabase-js';
import { loginUser } from '@/app/helpers/supabase/auth/login';
import { registerUser } from '@/app/helpers/supabase/auth/register';
interface AuthState {
  session: Session | null;
  isPending: boolean;
  error: string;
}

const initialState: AuthState = {
  session: null,
  isPending: false,
  error: '',
};
const E_MESSAGE = 'Something went wrong';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    return await loginUser(email, password);
  },
);
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }) => {
    return await registerUser(email, password);
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;

      localStorage.setItem('authSession', JSON.stringify(action.payload));
    },
    clearSession: (state) => {
      state.session = null;
      localStorage.removeItem('authSession');
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.session = action.payload.session;
        state.isPending = false;

        localStorage.setItem('authSession', JSON.stringify(action.payload));
      })
      .addCase(login.pending, (state) => {
        state.isPending = true;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message || E_MESSAGE;
      });
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.session = action.payload.session;
        state.isPending = false;

        localStorage.setItem('authSession', JSON.stringify(action.payload));
      })
      .addCase(register.pending, (state) => {
        state.isPending = true;
        state.error = '';
        console.log('loading...');
      })
      .addCase(register.rejected, (state, action) => {
        console.log('rejected...');
        state.isPending = false;
        state.error = action.error.message || E_MESSAGE;
      });
  },
});

export const { setSession, clearSession, clearError } = authSlice.actions;
export default authSlice.reducer;
