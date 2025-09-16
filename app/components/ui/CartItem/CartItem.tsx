import classes from './CartItem.module.scss';
import ItemImg from '../ProductCard/Image/Phone.png';
import CloseIcon from '@/public/icons/Close.svg';
import MinusIcon from '@/public/icons/Minus.svg';
import PlusIcon from '@/public/icons/Plus.svg';
import Image from 'next/image';
export function CartItem() {
  return (
    <div className={classes.cart_item}>
      <button className={classes.close_btn}>
        <Image src={CloseIcon} alt="x" width={16} height={16} />
      </button>
      <Image src={ItemImg} alt="item image" width={80} height={80} className={classes.image} />
      <p className={classes.title}>Apple iPhone 14 Pro 128GB Silver (MQ023)</p>
      <div className={classes.price_layout}>
        <div className={classes.quantityControls}>
          <button>
            <Image src={MinusIcon} alt="-" width={16} height={16} />
          </button>
          <span className={classes.amount}>1</span>
          <button>
            <Image src={PlusIcon} alt="+" width={16} height={16} />
          </button>
        </div>

        <span className={classes.price}>$799</span>
      </div>
    </div>
  );
}
