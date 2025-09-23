'use client';

import React from 'react';
import classes from './OrderSubmitButton.module.scss';

interface OrderSubmitButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function OrderSubmitButton({ label, onClick, className = '' }: OrderSubmitButtonProps) {
  return (
    <button
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}