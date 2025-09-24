'use client';

import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { getProductsStore } from '@/app/stores/slices/productSlice';
import { useEffect } from 'react';
import Loader from '../../ui/Loader/Loader';
import { HeroCategory } from '../HeroCategory/HeroCategory';
import { HeroSection } from '../HeroSection/HeroSection';
import { ProductsCarousel } from '../ProductsCarousel/ProductsCarousel';


export function HomePage() {
  const { loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsStore());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <section className="section">
        <HeroSection />
      </section>

      <section className="section">
        <ProductsCarousel title="Brand new models" param="year" />
      </section>
      <section className="section">
        <HeroCategory />
      </section>
      <section className="section">
        <ProductsCarousel title="Hot prices" param="price" />
      </section>
    </>
  );
}
