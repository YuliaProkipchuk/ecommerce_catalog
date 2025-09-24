import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/types/product';
import { Session } from '@supabase/supabase-js';
import { loginUser } from '@/app/helpers/supabase/auth/login';
import { registerUser } from '@/app/helpers/supabase/auth/register';
interface AuthState {
  session: Session | null;
}

const initialState: AuthState = {
  session: null,
};
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
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.session = action.payload.session;
      localStorage.setItem('authSession', JSON.stringify(action.payload));
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.session = action.payload.session;
      localStorage.setItem('authSession', JSON.stringify(action.payload));
    });
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
