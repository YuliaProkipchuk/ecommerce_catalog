'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../Buttons/Button/Button';
import classes from './TotalCost.module.scss';

interface CheckoutSummaryProps {
  totalItems: number;
  totalPrice: number;
  discountedPrice: number;
}

export function TotalCost({ totalItems, totalPrice, discountedPrice }: CheckoutSummaryProps) {
  const isDiscountApplied = totalPrice !== discountedPrice;
  const router = useRouter();

  const handleClick = () => router.push('/checkout');
  return (
    <div className={classes.total}>
      {isDiscountApplied && <span className={classes.wrong__price}>${Math.round(totalPrice)}</span>}
      <span className={classes.price}>${Math.round(discountedPrice)}</span>
      <p className={classes.info}>Total of {totalItems} items</p>
      <div className={classes.line}></div>
      <Button onClick={handleClick}>Checkout</Button>
    </div>
  );
}
