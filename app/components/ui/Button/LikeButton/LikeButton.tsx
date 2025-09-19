import React from 'react';
import classes from './LikeButton.module.scss';
import { Heart } from '../../Icons/Heart';

export function LikeButton() {
  return (
    <button className={classes.button}>
      <Heart />
    </button>
  );
}
