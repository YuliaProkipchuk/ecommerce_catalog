'use client';

import React from 'react';
import classes from './CheckoutButton.module.scss';

interface CheckoutButtonProps {
  label: string;
}

export function CheckoutButton({ label }: CheckoutButtonProps) {
  return (
    <button className={classes.button}>
      {label}
    </button>
  );
}
