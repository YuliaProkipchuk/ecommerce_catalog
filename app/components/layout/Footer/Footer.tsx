import React from 'react';
import classes from './Footer.module.scss';
import { FooterNavbar } from '../../ui/FooterNavbar/FooterNavbar';
import { Logo } from '../../ui/Logo/Logo';
import { UpButton } from '../../ui/Button/UpButton/UpButton';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_content}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <FooterNavbar />
        <div className={classes.scrollToTop_section}>
          <span className={classes.label}>Back to top</span>
          <UpButton />
        </div>
      </div>
    </footer>
  );
}
