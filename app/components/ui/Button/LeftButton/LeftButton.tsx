import React from 'react';
import classes from './LeftButton.module.scss';
import {ArrowLeft} from '../../Icons/ArrowLeft';

export function LeftButton() {
  return (
    <button className={classes.button__active}>
     <ArrowLeft/>
    </button>
  );
}
