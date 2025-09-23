'use client';

import { useParams } from 'next/navigation';
import { BackButton } from '../../ui/Button/BackButton/BackButton';
import { ThumbsGallery } from '../../ui/ThumbsGallery/ThumbsGallery';
import classes from './ProductDetails.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { useEffect, useMemo } from 'react';
import { getCategoryFullProducts } from '@/app/stores/slices/productSlice';
import { ProductsCarousel } from '../ProductsCarousel/ProductsCarousel';
import { ProductSpecification } from '../ProductSpecification/ProductSpecification';
import { ProductCustomization } from '../../ui/ProductCustomization/ProductCustomization';
import { prepareProduct } from '@/app/helpers/products/prepareProduct';

interface CreateProductProps {
  slug: string;
}

export function CreateProduct({ slug }: CreateProductProps) {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const { fullProduct, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (category) {
      dispatch(getCategoryFullProducts(category as string));
    }
  }, [category, dispatch]);

  const oneProduct = fullProduct.find((p) => p.id === slug);
  const relatedProducts = useMemo(
    () =>
      fullProduct.filter((p) => p.id !== slug).map((p) => prepareProduct(p, category as string)),
    [fullProduct],
  );
  if (loading || !oneProduct) {
    return;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(oneProduct.images);
  return (
    <>
      <section className="section">
        <h2 className="section-title">{oneProduct.name}</h2>
      </section>
      <section className="section">
        <div className={classes.customization_wrapper}>
          <ThumbsGallery images={oneProduct.images} />
          <ProductCustomization products={oneProduct} category={category as string} />
        </div>
      </section>

      <section className="section">
        <ProductSpecification products={oneProduct} />
      </section>
      <section className="section">
        <ProductsCarousel title="You may also like" products={relatedProducts} param="category" />
      </section>
    </>
  );
}
