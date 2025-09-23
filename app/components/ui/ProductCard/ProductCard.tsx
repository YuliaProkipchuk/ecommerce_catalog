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
import { toast } from 'react-toastify';

type ProductProps = {
  product: Product | Omit<Product, 'id' | 'year'>;
};

export function ProductCard({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.itemId === product.itemId);

  const [buttonText, setButtonText] = React.useState(isInCart ? 'Selected' : 'Add to cart');

  useEffect(() => {
    setButtonText(isInCart ? 'Selected' : 'Add to cart');
  }, [isInCart]);

  const handleAddToCartClick = () => {
    if (isInCart) {
      dispatch(removeItem(product.itemId));
      toast.info(`${product.name} was delete to cart.`, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } else {
      dispatch(addItem(product));
      toast.info(`${product.name} was add to cart.`, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  };

  const link = `/${product.category}/${product.itemId}`;
  const { favouritesProducts } = useAppSelector((state) => state.favourites);
  const isFavourite = favouritesProducts.some((p) => p.itemId === product.itemId);
  const toggleLike = () => {
    dispatch(toggleFavourites(product));
    if (!isFavourite) {
    toast.info(`${product.name} was add to favourit.`, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.info(`${product.name} was delete to favourit.`, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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
        <AddButton onClick={handleAddToCartClick} text={buttonText} isSelected={isInCart} />
        <LikeButton onClick={toggleLike} filled={isFavourite} />
      </div>
    </div>
  );
}
