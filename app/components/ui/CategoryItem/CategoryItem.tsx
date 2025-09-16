import React from 'react';
import classes from './CategoryItem.module.scss';
import Link from 'next/link';

export function CategoryItem() {
  return (
    <Link href={'/'} className={classes.category_item}>
      {/* <Image src={...} alt={'...'} className={classes.category_img}/> */}
      <div className={classes.category_img} /> {/* while image is absent */}
      <div className={classes.category_content}>
        <h4>Mobile phones</h4>
        <span>95 models</span>
      </div>
    </Link>
  );
}
