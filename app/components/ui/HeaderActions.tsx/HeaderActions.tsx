import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import favouritesHeartLike from '@/public/icons/Button/LikeButton/Favourites.svg';
import shoppingBagCart from '@/public/icons/ShoppingBag.svg';
import classes from './HeaderActions.module.scss';
import burgerMenu from '@/public/icons/Menu.svg';

interface HeaderActionsProps {
  toggleBurgerMenu: () => void;
}

export function HeaderActions({ toggleBurgerMenu }: HeaderActionsProps) {
  return (
    <div className={classes.header_actions}>
      <Link href="/favourites" className={classes.action_button}>
        <Image src={favouritesHeartLike} width={16} height={16} alt="Favourites" />
      </Link>
      <Link href="/cart" className={classes.action_button}>
        <Image src={shoppingBagCart} width={16} height={16} alt="Shopping cart" />
      </Link>
      <button className={classes.burger_button} onClick={toggleBurgerMenu} aria-label="Toggle menu">
        <Image src={burgerMenu} width={16} height={16} alt="Menu" />
      </button>
    </div>
  );
}
