import classes from './TotalCost.module.scss';
export function TotalCost() {
  return (
    <div className={classes.total}>
      <span className={classes.price}>$2657</span>
      <p className={classes.info}>Total of 3 items</p>
      <div className={classes.line}></div>
      <button className={classes.checkout_btn}>Checkout</button>
    </div>
  );
}
