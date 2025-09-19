import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';
const defaultTheme: string | null = localStorage.getItem('theme');
type State = {
  theme: Theme;
};

const initialState: State = {
  theme: defaultTheme ? (defaultTheme as Theme) : 'light',
};
const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = mainSlice.actions;
export default mainSlice.reducer;
