import { CheckoutButton } from '../Button/CheckoutButton/CheckoutButton';
import classes from './TotalCost.module.scss';

interface CheckoutSummaryProps {
  totalItems: number;
  totalPrice: number;
  discountedPrice: number;
}

export function TotalCost({ totalItems, totalPrice, discountedPrice }: CheckoutSummaryProps) {
  const isDiscountApplied = totalPrice !== discountedPrice;

  return (
    <div className={classes.total}>
      {isDiscountApplied && (
        <span className={classes.wrong__price}>${Math.round(totalPrice)}</span>
      )}
      <span className={classes.price}>${Math.round(discountedPrice)}</span>
      <p className={classes.info}>Total of {totalItems} items</p>
      <div className={classes.line}></div>
      <CheckoutButton label='Checkout'/>
    </div>
  );
}
