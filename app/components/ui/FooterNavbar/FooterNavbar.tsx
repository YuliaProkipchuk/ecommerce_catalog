import React from 'react';
import classes from './FooterNavbar.module.scss';
import Link from 'next/link';

export function FooterNavbar() {
  return (
    <ul className={classes.footer_nav}>
      <li>
        <Link href="/" className={classes.nav_link}>
          github
        </Link>
      </li>
      <li>
        <Link href="/" className={classes.nav_link}>
          contacts
        </Link>
      </li>
      <li>
        <Link href="/" className={classes.nav_link}>
          rights
        </Link>
      </li>
    </ul>
  );
}
