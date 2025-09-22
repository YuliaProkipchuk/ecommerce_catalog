'use client';

import { useParams } from 'next/navigation';
import { BackButton } from '../ui/Button/BackButton/BackButton';
import { ThumbsGallery } from '../ui/ThumbsGallery/ThumbsGallery';
import classes from './ProductDetails.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { useEffect } from 'react';
import { getCategoryFullProducts } from '@/app/stores/slices/productSlice';
import { ProductsCarousel } from '../layout/ProductsCarousel/ProductsCarousel';
import { ProductSpecification } from '../layout/ProductSpecification/ProductSpecification';
import { ProductCustomization } from '../ui/ProductCustomization/ProductCustomization';

interface CreateProductProps {
    slug: string
}

export function CreateProduct ({slug}: CreateProductProps) {
const { category } = useParams();
  const dispatch = useAppDispatch();
  const { fullProduct, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (category) {
      dispatch(getCategoryFullProducts(category as string));
    }
  }, [category, dispatch]);

const oneProduct = fullProduct.find(p => p.id === slug)

  if (loading || !oneProduct) {
    return;
  }

  if (error) {
    return <div>{error}</div>;
  }

    return (
        <>
            <section className="section">
                <BackButton />
                <h2 className="section-title">{oneProduct.name}</h2>
            </section>
            <section className="section">
                <div className={classes.customization_wrapper}>
                    <ThumbsGallery images={oneProduct.images} />
                    <ProductCustomization products={oneProduct}/>
                </div>
            </section>

            <section className="section">
                <ProductSpecification products={oneProduct} />
            </section>
            <section className="section">
                <ProductsCarousel />
            </section>
        </>

    );
}