'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores';
import classes from './CartCounter.module.scss';

export function CartCounter() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity === 0) {
    return null;
  }

  return <span className={classes.cart_counter}>{totalQuantity}</span>;
}
