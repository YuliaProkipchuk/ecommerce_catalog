import React from 'react';
import { useRouter } from 'next/navigation';
import classes from './CheckoutButton.module.scss';

interface CheckoutButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function CheckoutButton({ label, disabled = false, onClick }: CheckoutButtonProps) {
  const router = useRouter();

  const handleClick = onClick || (() => router.push('/checkout'));

  return (
    <button className={classes.button} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
}