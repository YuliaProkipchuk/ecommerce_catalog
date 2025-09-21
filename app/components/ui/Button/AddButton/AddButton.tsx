'use client';

import React from 'react';
import classes from './AddButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '@/app/stores/slices/cartSlice';
import { Product } from '@/app/types/product';
import { RootState } from '@/app/stores';

interface AddButtonProps {
  product: Product;
}

export function AddButton({ product }: AddButtonProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.itemId === product.itemId);
  const [buttonText, setButtonText] = React.useState(isInCart ? 'Selected' : 'Add to cart');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText(isInCart ? 'Selected' : 'Add to cart');
    }, 300);
    return () => clearTimeout(timer);
  }, [isInCart]);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeItem(product.itemId));
    } else {
      dispatch(addItem(product));
    }
  };

  return (
    <button
      className={`${classes.button} ${isInCart ? classes.selected : ''}`}
      onClick={handleAddToCart}
    >
      {buttonText}
    </button>
  );
}
