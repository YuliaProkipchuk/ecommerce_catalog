import classes from './CartItem.module.scss';
import ItemImg from '../ProductCard/Image/Phone.png';
import Image from 'next/image';
import { Close } from '../Icons/Close';
import { Minus } from '../Icons/Minus';
import { Plus } from '../Icons/Plus';
export function CartItem() {
  return (
    <div className={classes.cart_item}>
      <button className={classes.close_btn}>
        <Close disabled/>
      </button>
      <Image src={ItemImg} alt="item image" width={80} height={80} className={classes.image} />
      <p className={classes.title}>Apple iPhone 14 Pro 128GB Silver (MQ023)</p>
      <div className={classes.price_layout}>
        <div className={classes.quantityControls}>
          <button className={classes.button}>
            <Minus disabled />
          </button>
          <span className={classes.amount}>1</span>
          <button className={classes.button}>
            <Plus />
          </button>
        </div>

        <span className={classes.price}>$799</span>
      </div>
    </div>
  );
}
