'use client';
import React from 'react';
import classes from './FavouritesPage.module.scss';
import { useAppSelector } from '@/app/stores/hooks';
import { Layout } from '../../ui/Layout/Layout';
function FavouritesPage() {
  const { favouritesProducts } = useAppSelector((state) => state.favourites);
  return (
    <>
      <section className="section">
        <h1 className={`main-heading`}>Favourites</h1>
        <span className={classes.info}>{favouritesProducts.length} models</span>
      </section>
      <section className="section">
        <Layout products={favouritesProducts} />
      </section>
    </>
  );
}

export default FavouritesPage;
