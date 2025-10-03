import React from 'react';
import classes from './Button.module.scss';

type ButtonProps = {
  onClick?: any;
  styles?: string;
  disabled?: boolean;
  children: React.ReactNode;
};
export function Button({ onClick, children, styles, disabled = false }: ButtonProps) {
  return (
    <button className={`${classes.button} ${styles}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
