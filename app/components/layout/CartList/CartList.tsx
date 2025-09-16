import { CartItem } from '../../ui/CartItem/CartItem';
import classes from './CartList.module.scss';

export function CartList() {
  return (
    <section className={classes.cart_list}>
      <CartItem />
      <CartItem />
      <CartItem />
    </section>
  );
}
