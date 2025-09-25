'use client';
import React from 'react';
import classes from './CategoryItem.module.scss';
import Link from 'next/link';
import { selectTotalByCategory } from '@/app/stores/slices/productSlice';
import { useAppSelector } from '@/app/stores/hooks';

interface CategoryProps {
  categories: {
    src: string;
    alt: string;
    title: string;
    count: string;
    class: string;
    href: string;
  };
}

export function CategoryItem({ categories }: CategoryProps) {
  const data = useAppSelector((state) => state.products.clearProduts);
  const len = data.filter((product) => product.category === categories.alt.toLowerCase());
  return (
    <Link href={categories.href} className={classes.category_item}>
      <div className={classes.category_img}>
        <img src={categories.src} alt={categories.alt} className={classes[categories.class]} />
      </div>

      <div className={classes.category_content}>
        <h4>{categories.title}</h4>
        <span>{data.length} models</span>
      </div>
    </Link>
  );
}
