import React from 'react';
import classes from './CheckoutSummary.module.scss';
import { CheckoutButton } from '../Button/CheckoutButton/CheckoutButton';

interface CheckoutSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export function CheckoutSummary({ totalItems, totalPrice }: CheckoutSummaryProps) {
  return (
    <div className={classes.checkout_summary}>
      <h2 className={classes.total_price}>${totalPrice}</h2>
      <p className={classes.total_items}>Total for {totalItems} items</p>
      <div className={classes.divider}></div>
      <CheckoutButton label="Checkout" />
    </div>
  );
}
