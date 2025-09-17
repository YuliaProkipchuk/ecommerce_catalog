'use client';
import {HeroSection} from "@/app/components/layout/HeroSection/HeroSection";
import { HeroCategory } from '../components/layout/HeroCategory/HeroCategory';
import { ProductsCarousel } from '../components/layout/ProductsCarousel/ProductsCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/stores';
import { useEffect } from 'react';
import { getProductsStore } from '@/app/stores/slices/productSlice';

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(getProductsStore());
  }, [dispatch]);
  return (
    <>
      <section className="section">
        <div className="fakeSimulatedDiv"></div>
      </section>
      <section><HeroSection/></section>
      <section className="section">
        <ProductsCarousel title="Brand new models" />
      </section>
      <section>
        <HeroCategory />
      </section>
      <section className="section">
        <ProductsCarousel title="Hot prices" />
      </section>
    </>
  );
}
