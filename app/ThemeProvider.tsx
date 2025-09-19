'use client';
import React, { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './stores/hooks';
import { toggleTheme } from './stores/slices/mainSlice';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useAppSelector((state) => state.main.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return <>{children}</>;
}
