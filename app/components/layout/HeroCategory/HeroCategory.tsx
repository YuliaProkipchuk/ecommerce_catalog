import React from "react";
import classes from "./HeroCategory.module.scss";
import { CategoryItem } from "../../ui/CategoryItem/CategoryItem";

export function HeroCategory() {
  return (
    <>
      <section className="section">
        <h2 className="section-title">Shop by category</h2>
        <div className={classes.hero_categories}>
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </div>
      </section>
    </>
  );
}
