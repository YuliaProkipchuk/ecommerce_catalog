import React from 'react';
import { usePathname } from 'next/navigation';
import classes from './BurgerMenu.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface BurgerMenuProps {
  onClose: () => void;
}

export function BurgerMenu({ onClose }: BurgerMenuProps) {
  const pathname = usePathname();
  
  const getPathnameWithoutLocale = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && segments[0].length === 2) {
      return '/' + segments.slice(1).join('/');
    }
    return path === '' ? '/' : path;
  };

  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  const navItems = [
    { href: "/", label: "home" },
    { href: "/phones", label: "phones" },
    { href: "/tablets", label: "tablets" },
    { href: "/accessories", label: "accessories" },
  ];

  const isActive = (href: string) => {
    return pathWithoutLocale === href;
  };

  return (
    <div className={classes.burger_menu}>
      <div className={classes.burger_menu_header}>
        <Link href="/" className={classes.logo}>
          <Image src={'/logo.svg'} width={64} height={22} alt="Nice Gadgets logo" />
        </Link>
        <button className={classes.close_button} onClick={onClose} aria-label="Close menu">
          <Image src={'/icons/CloseActive.svg'} width={16} height={16} alt="Close" />
        </button>
      </div>
      <nav className={classes.burger_nav}>
        <ul className={classes.burger_nav_list}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${classes.burger_nav_link} ${isActive(item.href) ? classes.active : ''}`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={classes.burger_menu_footer}>
        <Link 
          href="/favourites" 
          className={`${classes.burger_action_button} ${pathWithoutLocale === '/favourites' ? classes.active : ''}`}
          onClick={onClose}
        >
          <Image src={'/icons/Button/LikeButton/Favourites.svg'} width={16} height={16} alt="Favourites" />
        </Link>
        <Link 
          href="/cart" 
          className={`${classes.burger_action_button} ${pathWithoutLocale === '/cart' ? classes.active : ''}`}
          onClick={onClose}
        >
          <Image src={'/icons/ShoppingBag.svg'} width={16} height={16} alt="Shopping cart" />
        </Link>
      </div>
    </div>
  );
}