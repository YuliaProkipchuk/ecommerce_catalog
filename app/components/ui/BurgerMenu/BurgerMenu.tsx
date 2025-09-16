import React from 'react';
import classes from './BurgerMenu.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import headerLogo from '@/public/icons/Logo.svg';
import closeIcon from '@/public/icons/CloseActive.svg';
import favouritesHeartLike from '@/public/icons/Button/LikeButton/Favourites.svg';
import shoppingBagCart from '@/public/icons/ShoppingBag.svg';

interface BurgerMenuProps {
  onClose: () => void;
}

export function BurgerMenu({ onClose }: BurgerMenuProps) {
  return (
    <div className={classes.burger_menu}>
      <div className={classes.burger_menu_header}>
        <Link href="/" className={classes.logo}>
          <Image src={headerLogo} width={64} height={22} alt="Nice Gadgets logo" />
        </Link>
        <button className={classes.close_button} onClick={onClose} aria-label="Close menu">
          <Image src={closeIcon} width={16} height={16} alt="Close" />
        </button>
      </div>
      <nav className={classes.burger_nav}>
        <ul className={classes.burger_nav_list}>
          <li>
            <Link
              href="/"
              className={`${classes.burger_nav_link} ${classes.active}`}
              onClick={onClose}
            >
              home
            </Link>
          </li>
          <li>
            <Link href="/phones" className={classes.burger_nav_link} onClick={onClose}>
              phones
            </Link>
          </li>
          <li>
            <Link href="/tablets" className={classes.burger_nav_link} onClick={onClose}>
              tablets
            </Link>
          </li>
          <li>
            <Link href="/accessories" className={classes.burger_nav_link} onClick={onClose}>
              accessories
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.burger_menu_footer}>
        <Link href="/favourites" className={classes.burger_action_button} onClick={onClose}>
          <Image src={favouritesHeartLike} width={16} height={16} alt="Favourites" />
        </Link>
        <Link href="/cart" className={classes.burger_action_button} onClick={onClose}>
          <Image src={shoppingBagCart} width={16} height={16} alt="Shopping cart" />
        </Link>
      </div>
    </div>
  );
}
