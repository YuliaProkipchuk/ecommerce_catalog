'use client';
import React from 'react';
import { Carousel } from '../../ui/Carousel/Carousel';
import classes from './ProductCarousel.module.scss';
import { LeftButton } from '../../ui/Button/LeftButton/LeftButton';
import { RightButton } from '../../ui/Button/RightButton/RightButton';
import { Product } from '@/app/types/product';
import { useAppSelector } from '@/app/stores/hooks';
import { sortProductsForCarousel } from '@/app/helpers/products/sortProductsForCarousel';
type Props = {
  title?: string;
  param?: keyof Product;
};
export function ProductsCarousel({ title = 'Brand new models', param = 'year' }: Props) {
  const customLeft = title.split(' ')[0].toLowerCase() + '-custom-prev';
  const customRight = title.split(' ')[0].toLowerCase() + '-custom-next';
  const { clearProduts } = useAppSelector((state) => state.products);
  const dataForCarousel = clearProduts.toSorted(sortProductsForCarousel(param));
  return (
    <section className="section">
      <div className={classes.carousel_header}>
        <h2 className="section-title">{title}</h2>
        <div className={classes.carousel_navigation}>
          <div className={customLeft}>
            <LeftButton />
          </div>
          <div className={customRight}>
            <RightButton />
          </div>
        </div>
      </div>

      <Carousel leftBtnClass={customLeft} rightBtnClass={customRight} slides={dataForCarousel} />
    </section>
  );
}
