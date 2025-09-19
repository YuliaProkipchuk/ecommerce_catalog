'use client';

import React, { useState } from 'react';
import classes from './Header.module.scss';
import Link from 'next/link';
import { HeaderNavbar } from '../../ui/HeaderNavbar/HeaderNavbar';
import { HeaderActions } from '../../ui/HeaderActions/HeaderActions';
import { BurgerMenu } from '../../ui/BurgerMenu/BurgerMenu';
import { Logo } from '../../ui/Logo/Logo';

export function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.header_content}>
          <Logo width={64} height={22} />
          <HeaderNavbar />
          <HeaderActions toggleBurgerMenu={toggleBurgerMenu} />
        </div>
      </header>
      {isBurgerMenuOpen && <BurgerMenu onClose={toggleBurgerMenu} />}
    </>
  );
}
