import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';
const defaultTheme: string | null = null;
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
    initTheme: (state: State) => {
      const initThemeLocal: null | string = localStorage.getItem('theme')
      state.theme = initThemeLocal ? (initThemeLocal as Theme) : 'light'
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme,initTheme } = mainSlice.actions;
export default mainSlice.reducer;
