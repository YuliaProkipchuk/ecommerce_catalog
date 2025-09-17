import React from 'react';
import classes from './CategoryItem.module.scss';
import Link from 'next/link';
import phonesImg from '../../../../public/img/category-phones.png'




interface CategoryProps {
  categories: {
    src: string;
    alt: string;
    title: string;
    count: string;
    class: string;
  };
}


export function CategoryItem({ categories }: CategoryProps) {
  return (
    <Link href={'/'} className={classes.category_item}>
     <div className={classes.category_img}>
      <img src={categories.src} alt={categories.alt} className={classes[categories.class]} />
      </div>
      
      <div className={classes.category_content}>
        <h4>{categories.title}</h4>
        <span>{categories.count}</span>
      </div>
    </Link>
  );
}
