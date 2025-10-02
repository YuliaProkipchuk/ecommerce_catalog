'use client';

import React from 'react';
import { CartItem } from '@/app/components/ui/CartItem/CartItem';
import classes from './Cart.module.scss';
import { TotalCost } from '@/app/components/ui/TotalCost/TotalCost';
import { BackButton } from '@/app/components/ui/Buttons/BackButton/BackButton';
import { useAppSelector } from '@/app/stores/hooks';

export function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const session = useAppSelector((state) => state.auth.session);

  const { totalItems, totalOriginalPrice } = cartItems.reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalOriginalPrice += item.product.price * item.quantity;
      return acc;
    },
    { totalItems: 0, totalOriginalPrice: 0 },
  );

  const discountRate = 0.05;
  const totalDiscountedPrice = session
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
