import React from 'react';
import { Carousel } from '../../ui/Carousel/Carousel';
import classes from './ProductCarousel.module.scss';
import { LeftButton } from '../../ui/Button/LeftButton/LeftButton';
import { RightButton } from '../../ui/Button/RightButton/RightButton';
type Props = {
  title?: string;
};
export function ProductsCarousel({ title = 'Brand new models' }: Props) {
  const customLeft = title.split(' ')[0].toLowerCase() + '-custom-prev';
  const customRight = title.split(' ')[0].toLowerCase() + '-custom-next';
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

      <Carousel leftBtnClass={customLeft} rightBtnClass={customRight} />
    </section>
  );
}
