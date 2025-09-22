'use client';

import React from 'react';
import classes from './AddButton.module.scss';
interface AddButtonProps {
  onClick?: () => void;
  text?: string;
  isSelected?: boolean;
}

export function AddButton({ onClick, text, isSelected }: AddButtonProps) {
  return (
    <button
      className={`${classes.button} ${isSelected ? classes.selected : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
