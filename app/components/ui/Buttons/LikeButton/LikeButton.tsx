import React from 'react';
import classes from './LikeButton.module.scss';
import { Heart } from '../../Icons/Heart';

type Props = {
  onClick?: () => void;
  filled?: boolean;
};
export function LikeButton({ onClick, filled = false }: Props) {
  return (
    <button className={classes.button} onClick={onClick}>
      <Heart filled={filled} />
    </button>
  );
}
