import React from 'react';
import classes from './LikeButton.module.scss';

export function LikeButton() {
  return (
    <button className={classes.button}>
      <div className={classes.like}></div>
    </button>
  );
}
