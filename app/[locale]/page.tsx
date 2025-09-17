'use client';
import { Header } from '../components/layout/Header/Header';
import { ProductCustomization } from '../components/ui/ProductCustomization/ProductCustomization';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/stores';
import { useEffect } from 'react';
import { getProductsStore } from '@/app/stores/slices/productSlice';
import { ProductsCarousel } from '../components/layout/ProductsCarousel/ProductsCarousel';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(getProductsStore());
  }, [dispatch]);
  return (
    <>
      <ProductsCarousel />
      <ProductCustomization />
    </>
  );
}
