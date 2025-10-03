'use client';

import React from 'react';
import classes from './AddButton.module.scss';
interface AddButtonProps {
  onClick?: () => void;
  isSelected?: boolean;
}

export function AddButton({ onClick, isSelected }: AddButtonProps) {
  const text = isSelected ? 'Added to cart' : 'Add to cart';
  return (
    <button className={`${classes.button} ${isSelected ? classes.selected : ''}`} onClick={onClick}>
      {text}
    </button>
  );
}
