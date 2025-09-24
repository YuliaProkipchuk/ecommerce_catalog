'use client';

import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { getProductsStore } from '@/app/stores/slices/productSlice';
import { useEffect, useState } from 'react';
import Loader from '../../ui/Loader/Loader';
import { HeroCategory } from '../HeroCategory/HeroCategory';
import { HeroSection } from '../HeroSection/HeroSection';
import { ProductsCarousel } from '../ProductsCarousel/ProductsCarousel';
import { Modal } from '../../Modal/Modal';

export function HomePage() {
  const { loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  
  const { session } = useAppSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

   useEffect(() => {

    if (!session && !hasShownModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        setHasShownModal(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
    
    if (session) {
      setIsModalOpen(false);
    }

  }, [session, dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}
