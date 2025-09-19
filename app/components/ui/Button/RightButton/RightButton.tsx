import React from 'react';
import classes from './RightButton.module.scss';
import { ArrowRight } from '../../Icons/ArrowRight';

export function RightButton() {
  return (
    <button className={classes.button__active}>
      <ArrowRight />
    </button>
  );
}
