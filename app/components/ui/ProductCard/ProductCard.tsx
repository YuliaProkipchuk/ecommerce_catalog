'use client';

import React, { useEffect } from 'react';
import classes from './ProductCard.module.scss';
import { AddButton } from '../Button/AddButton/AddButton';
import { LikeButton } from '../Button/LikeButton/LikeButton';
import Link from 'next/link';
import { Product } from '@/app/types/product';
import { addItem, removeItem } from '@/app/stores/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { toggleFavourites } from '@/app/stores/slices/favouritesSlice';

type ProductProps = {
  product: Product;
};

export function ProductCard({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
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
  const { favouritesProducts } = useAppSelector((state) => state.favourites);
  const isFavourite = favouritesProducts.some((p) => p.itemId === product.itemId);
  const toggleLike = () => {
    dispatch(toggleFavourites(product));
  };
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
        <LikeButton onClick={toggleLike} filled={isFavourite} />
      </div>
    </div>
  );
}