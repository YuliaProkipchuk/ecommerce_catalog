import React from 'react';
import classes from './Counter.module.scss';

type Props = {
  count: number;
};
export function Counter({ count }: Props) {
  if (count === 0) {
    return null;
  }

  return <span className={classes.counter}>{count}</span>;
}
