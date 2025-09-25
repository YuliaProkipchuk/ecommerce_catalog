import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import classes from './BurgerMenu.module.scss';
import Link from 'next/link';

import { Close } from '../Icons/Close';
import { Heart } from '../Icons/Heart';
import { ShoppingBag } from '../Icons/ShoppingBag';
import { Logo } from '../Logo/Logo';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { Sun } from '../Icons/Sun';
import { Moon } from '../Icons/Moon';
import { toggleTheme } from '@/app/stores/slices/mainSlice';
import { CartCounter } from '../CartCounter/CartCounter';
import { supabase } from '@/app/helpers/supabase/supabaseclient';
import { clearSession } from '@/app/stores/slices/authSlice';
import { resetForm } from '@/app/stores/slices/checkoutFormSlice';

interface BurgerMenuProps {
  onClose: () => void;
}

export function BurgerMenu({ onClose }: BurgerMenuProps) {
  const pathname = usePathname();
  const theme = useAppSelector((state) => state.main.theme);
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    dispatch(clearSession());
    dispatch(resetForm());
  };
  const getPathnameWithoutLocale = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && segments[0].length === 2) {
      return '/' + segments.slice(1).join('/');
    }
    return path === '' ? '/' : path;
  };

  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  const navItems = [
    { href: '/', label: 'home' },
    { href: '/phones', label: 'phones' },
    { href: '/tablets', label: 'tablets' },
    { href: '/accessories', label: 'accessories' },
    { href: '/sign-in', label: !session ? 'sign in' : 'log out' },
  ];

  const isActive = (href: string) => {
    return pathWithoutLocale === href;
  };
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
    setTimeout(() => {
      onClose();
    }, 50);
  };
  return (
    <div className={classes.burger_menu}>
      <div className={classes.burger_menu_header}>
        <Logo width={64} height={22} />

        <button className={classes.close_button} onClick={onClose} aria-label="Close menu">
          <Close />
        </button>
      </div>
      <nav className={classes.burger_nav}>
        <ul className={classes.burger_nav_list}>
          {navItems.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${classes.burger_nav_link} ${isActive(item.href) ? classes.active : ''}`}
                onClick={
                  i === navItems.length - 1 ? handleLogOut : (e) => handleClick(e, item.href)
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={classes.burger_menu_footer}>
        <button className={classes.theme_button} onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <Sun /> : <Moon />}
        </button>
        <Link
          href="/favourites"
          className={`${classes.burger_action_button} ${pathWithoutLocale === '/favourites' ? classes.active : ''}`}
          onClick={(e) => handleClick(e, '/favourites')}
        >
          <Heart />
        </Link>
        <Link
          href="/cart"
          className={`${classes.burger_action_button} ${pathWithoutLocale === '/cart' ? classes.active : ''}`}
          onClick={(e) => handleClick(e, '/cart')}
        >
          <ShoppingBag />
          <CartCounter />
        </Link>
      </div>
    </div>
  );
}
