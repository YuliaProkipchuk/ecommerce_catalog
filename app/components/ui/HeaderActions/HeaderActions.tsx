import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import classes from './HeaderActions.module.scss';

interface HeaderActionsProps {
  toggleBurgerMenu: () => void;
}

export function HeaderActions({ toggleBurgerMenu }: HeaderActionsProps) {
  const pathname = usePathname();

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
      <Link 
        href="/favourites" 
        className={`${classes.action_button} ${pathWithoutLocale === '/favourites' ? classes.active : ''}`}
      >
        <Image src={'/icons/Button/LikeButton/Favourites.svg'} width={16} height={16} alt="Favourites" />
      </Link>
      <Link 
        href="/cart" 
        className={`${classes.action_button} ${pathWithoutLocale === '/cart' ? classes.active : ''}`}
      >
        <Image src={'/icons/ShoppingBag.svg'} width={16} height={16} alt="Shopping cart" />
      </Link>
      <button className={classes.burger_button} onClick={toggleBurgerMenu} aria-label="Toggle menu">
        <Image src={`/icons/Menu.svg`} width={16} height={16} alt="Menu" />
      </button>
    </div>
  );
}
