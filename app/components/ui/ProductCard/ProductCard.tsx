'use client';

import React, { useEffect } from 'react';
import phoneImage from './Image/Phone.png';
import classes from './ProductCard.module.scss';
import { AddButton } from '../Button/AddButton/AddButton';
import { LikeButton } from '../Button/LikeButton/LikeButton';
import Link from 'next/link';
import { Product } from '@/app/types/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/stores';
import { addItem, removeItem } from '@/app/stores/slices/cartSlice';

type ProductProps = {
  product: Product;
};

export function ProductCard({ product }: ProductProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.itemId === product.itemId);

  const [buttonText, setButtonText] = React.useState(isInCart ? 'Selected' : 'Add to cart');

  useEffect(() => {
    setButtonText(isInCart ? 'Selected' : 'Add to cart');
  }, [isInCart]);

  const handleAddToCartClick = () => {
    if (isInCart) {
      dispatch(removeItem(product.itemId));
    } else {
      dispatch(addItem(product));
    }
  };

  const link = `/${product.category}/${product.itemId}`;
  return (
    <div className={classes.card}>
      <div className={classes.image}>
        <img src={`/${product.image}`} alt={product.name} className={classes.image__img} />
      </div>
      <Link href={link} className={classes.name}>
        <h4>{product.name}</h4>
      </Link>
      <div className={classes.price}>
        <p className={classes.price__current}>${product.price}</p>
        <p className={classes.wrong__price}>${product.fullPrice}</p>
      </div>

      <div className={classes.blok}>
        <div className={classes.info__blok}>
          <p className={classes.parameter}>Screen</p>
          <p className={classes.info}>{product.screen}</p>
        </div>

        <div className={classes.info__blok}>
          <p className={classes.parameter}>Capacity</p>
          <p className={classes.info}>{product.capacity}</p>
        </div>

        <div className={classes.info__blok}>
          <p className={classes.parameter}>RAM</p>
          <p className={classes.info}>{product.ram}</p>
        </div>
      </div>

      <div className={classes.buttons}>
        <AddButton
          onClick={handleAddToCartClick}
          text={buttonText}
          isSelected={isInCart}
        />
        <LikeButton />
      </div>
    </div>
  );
}