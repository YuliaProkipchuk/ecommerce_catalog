'use client';

import { useParams } from 'next/navigation';
import { BackButton } from '../../ui/Button/BackButton/BackButton';
import { ThumbsGallery } from '../../ui/ThumbsGallery/ThumbsGallery';
import classes from './ProductDetails.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { useEffect, useMemo } from 'react';
import {
  findById,
  getCategoryFullProducts,
  getProductById,
  getProductByIdForCart,
  getProductsStore,
} from '@/app/stores/slices/productSlice';
import { ProductsCarousel } from '../ProductsCarousel/ProductsCarousel';
import { ProductSpecification } from '../ProductSpecification/ProductSpecification';
import { ProductCustomization } from '../../ui/ProductCustomization/ProductCustomization';
import { prepareProduct } from '@/app/helpers/products/prepareProduct';
import Loader from '../../ui/Loader/Loader';

interface CreateProductProps {
  slug: string;
}

export function CreateProduct({ slug }: CreateProductProps) {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const { fullProduct, loading, error, selectedProduct } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    async function fetchData() {
      if (!category) return;

      try {
        await Promise.all([
          dispatch(getCategoryFullProducts(category as string)).unwrap(),
          dispatch(getProductById({ id: slug, table: category as string })).unwrap(),
          dispatch(getProductByIdForCart(slug)).unwrap(),
        ]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [category, dispatch]);
  const oneProduct = selectedProduct;
  const relatedProducts = useMemo(
    () =>
      fullProduct.filter((p) => p.id !== slug).map((p) => prepareProduct(p, category as string)),
    [fullProduct],
  );
  if (loading || !oneProduct) {
    return <Loader />;
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
