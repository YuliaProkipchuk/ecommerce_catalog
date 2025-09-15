import React from "react";
import { Carousel } from "../../ui/Carousel/Carousel";
import classes from "./ProductCarousel.module.scss";
type Props = {
  title?: string;
};
export function ProductsCarousel({ title = "Brand new models" }: Props) {
  return (
    <section className="section">
      <div className={classes.carousel_header}>
        <h2 className="section-title">{title}</h2>
        <div className={classes.carousel_navigation}>
          {/* there will be buttons */}
          <button className={`custom-prev`}>L</button>
          <button className={`custom-next`}>R</button>
        </div>
      </div>

      <Carousel />
    </section>
  );
}
