'use client';
import classes from './ProductCustomization.module.scss';
import { AddButton } from '../Buttons/AddButton/AddButton';
import { CapacityButton } from '../Buttons/CapacityButton/CapacityButton';
import { ColorChangeButtons } from '../Buttons/ColorChangeButtons/ColorChangeButtons';
import { LikeButton } from '../Buttons/LikeButton/LikeButton';
import { FullProduct } from '@/app/types/fullProduct';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { toggleFavourites } from '@/app/stores/slices/favouritesSlice';
import { useEffect, useState } from 'react';
import { addItem, removeItem } from '@/app/stores/slices/cartSlice';
import { prepareProduct } from '@/app/helpers/products/prepareProduct';
import { toast, ToastPosition } from 'react-toastify';
import { getProductsSupaId } from '@/app/helpers/supabase/products/getProductId';
import { getOnlyProdSupaId } from '@/app/helpers/supabase/products/getOnlyProdSupaId';

interface ProductProps {
  products: FullProduct;
  category: string;
}
const options = {
  position: 'bottom-right' as ToastPosition,
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export function ProductCustomization({ products, category }: ProductProps) {
  const pr = prepareProduct(products, category);
  const dispatch = useAppDispatch();
  const { favouritesProducts } = useAppSelector((state) => state.favourites);
  const isFavourite = favouritesProducts.some((p) => p.itemId === products.id);
  const { selectedForCart } = useAppSelector((state) => state.products);
  const preparedProduct = selectedForCart || pr;
  const toggleLike = async () => {
    dispatch(toggleFavourites(preparedProduct));
    if (!isFavourite) {
      toast.info(`${products.name} was add to favourites.`, options);
    } else {
      toast.info(`${products.name} was removed from favourites.`, options);
    }
  };
  const cartItems = useAppSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.itemId === preparedProduct.itemId);

  const handleAddToCartClick = () => {
    if (isInCart) {
      dispatch(removeItem(preparedProduct.itemId));
      toast.info(`${products.name} was removed from the cart.`, options);
    } else {
      dispatch(addItem(preparedProduct));
      toast.info(`${products.name} was added to the cart.`, options);
    }
  };
  return (
    <>
      <div className={classes.castomization}>
        <div>
          <div className={classes.head__text}>
            <p className={classes.color__text}>Available colors</p>
            <p className={classes.id__text}>ID: {products.namespaceId}</p>
          </div>

          <div className={classes.available__color}>
            <ColorChangeButtons
              colors={products.colorsAvailable}
              activeColor={products.color}
              activeCapacity={products.capacity}
              itemId={products.namespaceId}
            />
          </div>
        </div>

        <p className={classes.capacity__text}>Select capacity</p>
        <div className={classes.capacity}>
          <CapacityButton
            capacity={products.capacityAvailable}
            activeCapacity={products.capacity}
            itemId={products.namespaceId}
            activeColor={products.color}
          />
        </div>

        <div className={classes.price}>
          <p className={classes.price__current}>${products.priceDiscount}</p>
          <p className={classes.wrong__price}>${products.priceRegular}</p>
        </div>

        <div className={classes.buttons}>
          <AddButton onClick={handleAddToCartClick} isSelected={isInCart} />
          <LikeButton filled={isFavourite} onClick={toggleLike} />
        </div>

        <div className={classes.blok}>
          <div className={classes.info__blok}>
            <p className={classes.parameter}>Screen</p>
            <p className={classes.info}>{products.screen}</p>
          </div>

          <div className={classes.info__blok}>
            <p className={classes.parameter}>Resolution</p>
            <p className={classes.info}>{products.resolution}</p>
          </div>

          <div className={classes.info__blok}>
            <p className={classes.parameter}>Processor</p>
            <p className={classes.info}>{products.processor}</p>
          </div>

          <div className={classes.info__blok}>
            <p className={classes.parameter}>RAM</p>
            <p className={classes.info}>{products.ram}</p>
          </div>
        </div>
      </div>
    </>
  );
}
