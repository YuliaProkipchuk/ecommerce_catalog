import React from 'react';
import classes from './FooterNavbar.module.scss';
import Link from 'next/link';

export function FooterNavbar() {
  return (
    <ul className={classes.footer_nav}>
      <li>
        <Link
          href="https://github.com/BlackUserSide/ecommerce_catalog"
          className={classes.nav_link}
        >
          github
        </Link>
      </li>
      <li>
        <Link href="/contacts" className={classes.nav_link}>
          contacts
        </Link>
      </li>
      <li>
        <Link href="/rights" className={classes.nav_link}>
          rights
        </Link>
      </li>
    </ul>
  );
}
