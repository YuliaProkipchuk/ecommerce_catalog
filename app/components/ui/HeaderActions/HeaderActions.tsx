import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import classes from './HeaderActions.module.scss';

import { Heart } from '../Icons/Heart';
import { ShoppingBag } from '../Icons/ShoppingBag';
import { Menu } from '../Icons/Menu';
import { Sun } from '../Icons/Sun';
import { Moon } from '../Icons/Moon';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { toggleTheme } from '@/app/stores/slices/mainSlice';
import { Counter } from '../Counter/Counter';

interface HeaderActionsProps {
  toggleBurgerMenu: () => void;
}

export function HeaderActions({ toggleBurgerMenu }: HeaderActionsProps) {
  const pathname = usePathname();
  const theme = useAppSelector((state) => state.main.theme);
  const cartCount = useAppSelector((state) => state.cart.count);
  const favouritesCount = useAppSelector((state) => state.favourites.count);
  const dispatch = useAppDispatch();

  const getPathnameWithoutLocale = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && segments[0].length === 2) {
      return '/' + segments.slice(1).join('/');
    }
    return path === '' ? '/' : path;
  };

  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  return (
    <div className={classes.header_actions}>
      <button className={classes.theme_button} onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>
      <Link
        href="/favourites"
        className={`${classes.action_button} ${pathWithoutLocale === '/favourites' ? classes.active : ''}`}
      >
        <Heart />
        <Counter count={favouritesCount} />
      </Link>
      <Link
        href="/cart"
        className={`${classes.action_button} ${pathWithoutLocale === '/cart' ? classes.active : ''}`}
      >
        <ShoppingBag />
        <Counter count={cartCount} />
      </Link>

      <button className={classes.burger_button} onClick={toggleBurgerMenu} aria-label="Toggle menu">
        <Menu />
      </button>
    </div>
  );
}
