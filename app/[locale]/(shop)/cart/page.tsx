import React from 'react';
import classes from './Cart.module.scss';
import { CartList } from '@/app/components/layout/CartList/CartList';
import { TotalCost } from '@/app/components/ui/TotalCost/TotalCost';
import { BackButton } from '@/app/components/ui/Button/BackButton/BackButton';
function Page() {
  return (
    <main className={`main ${classes.page_layout}`}>
      <BackButton />
      <h1 className="main-heading">Cart</h1>
      <section className={classes.cart_layout}>
        <CartList />
        <TotalCost />
      </section>
    </main>
  );
}

export default Page;
