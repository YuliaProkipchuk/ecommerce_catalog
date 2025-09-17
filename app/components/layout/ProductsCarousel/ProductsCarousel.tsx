import React from 'react';
import { Carousel } from '../../ui/Carousel/Carousel';
import classes from './ProductCarousel.module.scss';
import { LeftButton } from '../../ui/Button/LeftButton/LeftButton';
import { RightButton } from '../../ui/Button/RightButton/RightButton';
type Props = {
  title?: string;
};
export function ProductsCarousel({ title = 'Brand new models' }: Props) {
  return (
    <section className="section">
      <div className={classes.carousel_header}>
        <h2 className="section-title">{title}</h2>
        <div className={classes.carousel_navigation}>
          {/* there will be buttons */}
          <div className="custom-prev">
            <LeftButton />
          </div>
          <div className="custom-next">
            <RightButton />
          </div>
        </div>
      </div>

      <Carousel />
    </section>
  );
}
