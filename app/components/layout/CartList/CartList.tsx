import React from 'react';
import classes from './CartList.module.scss';
import Link from 'next/link';
import { ShoppingBag } from '../../ui/Icons/ShoppingBag';
import { CartCounter } from '../../ui/CartCounter/CartCounter';

export function CartList() {
  return (
    <Link href="/cart" className={classes.cart_list}>
      <ShoppingBag />
      <CartCounter />
    </Link>
  );
}
