'use client';

import React from 'react';
import classes from './UpButton.module.scss';

export function UpButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button className={classes.button} onClick={scrollToTop}>
      <div className={classes.up}></div>
    </button>
  );
}
