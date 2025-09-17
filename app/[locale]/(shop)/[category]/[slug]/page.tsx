import { ProductSpecification } from '@/app/components/layout/ProductSpecification/ProductSpecification';
import { BackButton } from '@/app/components/ui/Button/BackButton/BackButton';
import { ProductCustomization } from '@/app/components/ui/ProductCustomization/ProductCustomization';
import { ThumbsGallery } from '@/app/components/ui/ThumbsGallery/ThumbsGallery';
import React from 'react';
import classes from './ProductDetails.module.scss';
import { ProductsCarousel } from '@/app/components/layout/ProductsCarousel/ProductsCarousel';
async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <BackButton />
      <h1 className="main-heading">{slug}</h1>
      <section className="section">
        <div className={classes.customization_wrapper}>
          <ThumbsGallery />
          <ProductCustomization />
        </div>
      </section>

      <section className="section">
        <ProductSpecification />
      </section>
      <section className="section">
        <ProductsCarousel />
      </section>
    </>
  );
}

export default Page;
