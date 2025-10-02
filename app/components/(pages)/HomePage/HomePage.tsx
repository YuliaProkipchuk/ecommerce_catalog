'use client';

import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { getProductsStore } from '@/app/stores/slices/productSlice';
import { useEffect, useState } from 'react';
import Loader from '../../ui/Loader/Loader';
import { Modal } from '../../ui/Modal/Modal';
import { HeroSection } from '../../layout/HeroSection/HeroSection';
import { ProductsCarousel } from '../../layout/ProductsCarousel/ProductsCarousel';
import { HeroCategory } from '../../layout/HeroCategory/HeroCategory';
import classes from '../../ui/Modal/Modal.module.scss';
import Link from 'next/link';

export function HomePage() {
  const { loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const { session } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const text = !session
    ? 'Welcome to Nice Gadgets store!'
    : `Welcome, ${session.user.user_metadata.full_name}`;
  useEffect(() => {
    const hasShownHomepageModal = localStorage.getItem('hasShownHomepageModal');
    if (!session && !hasShownHomepageModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem('hasShownHomepageModal', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (session) {
      setIsModalOpen(false);
    }
  }, [session]);

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
        <HeroSection title={text} />
      </section>
      <ProductsCarousel title="Brand new models" param="year" />
      <HeroCategory />
      <ProductsCarousel title="Hot prices" param="price" />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className={classes.text}>
            <h2>Discount of 5% after authorization</h2>
            <p>Sign up to our store and get a 5% discount on your total purchases.</p>
            <Link href={`/sign-up`} className={classes.signUp_button}>
              Sign up
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
}
