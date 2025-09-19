'use client';

import React from 'react';
import classes from './UpButton.module.scss';
import { ArrowUp } from '../../Icons/ArrowUp';

export function UpButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={classes.button} onClick={scrollToTop}>
      <ArrowUp />
    </button>
  );
}
