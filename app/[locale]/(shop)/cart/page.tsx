'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores';
import { CartItem } from '@/app/components/ui/CartItem/CartItem';
import classes from './Cart.module.scss';
import { TotalCost } from '@/app/components/ui/TotalCost/TotalCost';
import { BackButton } from '@/app/components/ui/Button/BackButton/BackButton';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = 'mockUser';
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const discountRate = 0.05;
  const totalDiscountedPrice = user
    ? Math.round(totalOriginalPrice * (1 - discountRate))
    : totalOriginalPrice;

  if (cartItems.length === 0) {
    return (
      <div className={classes.cart_page}>
        <BackButton />
        <div className={classes.empty_cart}>
          <h1 className={classes.title}>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.cart_page}>
      <BackButton />
      <h1 className={classes.title}>Cart</h1>
      <div className={classes.content}>
        <div className={classes.cart_items_list}>
          {cartItems.map((item) => (
            <CartItem key={item.itemId} item={item} />
          ))}
        </div>
        <TotalCost
          totalItems={totalItems}
          totalPrice={totalOriginalPrice}
          discountedPrice={totalDiscountedPrice}
        />
      </div>
    </div>
  );
}
