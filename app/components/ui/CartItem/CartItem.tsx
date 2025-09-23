import classes from './CartItem.module.scss';
import Image from 'next/image';
import { Close } from '../Icons/Close';
import { Minus } from '../Icons/Minus';
import { Plus } from '../Icons/Plus';
import { useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from '@/app/stores/slices/cartSlice';
import { Product } from '@/app/types/product';
import { toast } from 'react-toastify';

interface CartItemProps {
  item: {
    itemId: string;
    quantity: number;
    product: Omit<Product, 'id' | 'year'>;
  };
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem(item.itemId));
    
    toast.info(`${item.product.name} was removed from the cart.`, {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.itemId));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.itemId));
  };

  return (
    <div className={classes.cart_item}>
      <button className={classes.close_btn} onClick={handleRemove}>
        <Close disabled={false} />
      </button>
      <Image
        src={`/${item.product.image}`}
        alt={item.product.name}
        width={80}
        height={80}
        className={classes.image}
      />
      <p className={classes.title}>{item.product.name}</p>
      <div className={classes.price_layout}>
        <div className={classes.quantityControls}>
          <button
            className={classes.button}
            onClick={handleDecrement}
            disabled={item.quantity === 1}
          >
            <Minus disabled={item.quantity === 1} />
          </button>
          <span className={classes.amount}>{item.quantity}</span>
          <button
            className={classes.button}
            onClick={handleIncrement}
            disabled={item.quantity === 10}
          >
            <Plus disabled={item.quantity === 10} />
          </button>
        </div>

        <span className={classes.price}>${item.product.price * item.quantity}</span>
      </div>
    </div>
  );
}
