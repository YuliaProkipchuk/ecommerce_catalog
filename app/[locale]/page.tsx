'use client';
import { HeroSection } from '@/app/components/layout/HeroSection/HeroSection';
import { HeroCategory } from '../components/layout/HeroCategory/HeroCategory';
import { ProductsCarousel } from '../components/layout/ProductsCarousel/ProductsCarousel';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/stores';
import { useEffect } from 'react';
import { getProductsStore } from '@/app/stores/slices/productSlice';
import { getProductsSupa } from '@/app/helpers/supabase/products/getProducts';
import { getPhones } from '@/app/helpers/supabase/products/phones';
import { getAcc } from '@/app/helpers/supabase/products/getAcc';
import { getTablets } from '@/app/helpers/supabase/products/getTablets';
import { loginUser } from '@/app/helpers/supabase/auth/login';
import { registerUser } from '@/app/helpers/supabase/auth/register';
import { useAppSelector } from '../stores/hooks';
import Loader from '../components/ui/Loader/Loader';
import {getProductsSupaId} from "@/app/helpers/supabase/products/getProductId";
import {getOnlyProdSupaId} from "@/app/helpers/supabase/products/getOnlyProdSupaId";

export default function Home() {
  const { loading } = useAppSelector((state) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProductsStore());
      getProductsSupaId(2, 'products')

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
