'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initCart } from '@/app/stores/slices/cartSlice';

export function CartInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, [dispatch]);

  return null;
}
