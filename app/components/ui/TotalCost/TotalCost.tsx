import classes from './TotalCost.module.scss';

interface CheckoutSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export function TotalCost({ totalPrice, totalItems }: CheckoutSummaryProps) {
  return (
    <div className={classes.total}>
      <span className={classes.price}>${totalPrice}</span>
      <p className={classes.info}>Total of {totalItems} items</p>
      <div className={classes.line}></div>
      <button className={classes.checkout_btn}>Checkout</button>
    </div>
  );
}
