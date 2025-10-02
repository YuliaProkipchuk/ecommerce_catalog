'use client';
import React from 'react';
import classes from './Footer.module.scss';
import cs from '../../ui/Buttons/Button/Button.module.scss';
import { FooterNavbar } from '../../ui/FooterNavbar/FooterNavbar';
import { Logo } from '../../ui/Logo/Logo';
import { Button } from '../../ui/Buttons/Button/Button';
import { ArrowUp } from '../../ui/Icons/ArrowUp';
import { scrollToTop } from '@/app/helpers/scrollToTop';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_content}>
        <div className={classes.logo}>
          <Logo width={89} height={32} />
        </div>
        <FooterNavbar />
        <div className={classes.scrollToTop_section}>
          <span className={classes.label}>Back to top</span>
          <Button onClick={scrollToTop} styles={cs.nav_button__active}>
            <ArrowUp />
          </Button>
        </div>
      </div>
    </footer>
  );
}
