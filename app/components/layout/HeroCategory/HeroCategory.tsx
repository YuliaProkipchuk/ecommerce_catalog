import React from 'react';
import classes from './HeroCategory.module.scss';
import { CategoryItem } from '../../ui/CategoryItem/CategoryItem';


const categories = [
  {
    src: '/img/category-phones.png',
    alt: 'Phones',
    title: 'Mobile phones',
    count: '95 models',
    class: 'category_phone'
  },
  {
    src: '/img/category-tablets.png',
    alt: 'Tablets',
    title: 'Tablets',
    count: '24 models',
    class: 'category_tablets'
  },
  {
    src: '/img/category-accessories.png',
    alt: 'Accessories',
    title: 'Accessories',
    count: '100 models',
    class: 'category_accessories'
  }
];


export function HeroCategory() {
  return (
    <>
      <section className="section">
        <h2 className="section-title">Shop by category</h2>
        <div className={classes.hero_categories}>
          {categories.map(category => (
            <CategoryItem
              key={category.title}
              categories={category}
             
            />
          ))}
        </div>
      </section>
    </>
  );
}
