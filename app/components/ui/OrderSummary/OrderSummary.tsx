'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classes from './OrderSummary.module.scss';
import { Button } from '../Buttons/Button/Button';

type ShortItem = {
  itemId: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
};

interface OrderSummaryProps {
  items?: ShortItem[];
  subtotal: number;
  shipping: number;
  isLoggedIn: boolean;
  isFormValid: boolean;
  onPlaceOrder: () => void;
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  isLoggedIn,
  isFormValid,
  onPlaceOrder,
}: OrderSummaryProps) {
  const discountRate = 0.05;
  const discountAmount = isLoggedIn ? subtotal * discountRate : 0;
  const discountedSubtotal = isLoggedIn ? subtotal - discountAmount : subtotal;
  const displayTotal = discountedSubtotal + shipping;

  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handlePlaceOrderClick = () => {
    if (!isFormValid) {
      setShowValidationMessage(true);
      return;
    }
    onPlaceOrder();
  };

  useEffect(() => {
    if (isFormValid) {
      setShowValidationMessage(false);
    }
  }, [isFormValid]);

  const getButtonClass = () => {
    return !isFormValid && showValidationMessage ? classes.button_error : '';
  };

  const renderError = () =>
    !isFormValid && showValidationMessage ? (
      <div className={classes.error_message}>
        <span>Please fill in all required fields</span>
      </div>
    ) : null;

  return (
    <div className={classes.order_summary}>
      <h2 className={classes.title}>Order Summary</h2>

      {items && items.length > 0 && (
        <div className={classes.items_preview}>
          {items.map((it) => (
            <div className={classes.order_item} key={it.itemId}>
              <div className={classes.left}>
                <div className={classes.thumb}>
                  <Image
                    src={`/${it.image}`}
                    alt={it.name}
                    width={48}
                    height={48}
                    className={classes.thumb_img}
                  />
                </div>

                <div className={classes.name_wrap}>
                  <div className={classes.name}>{it.name}</div>
                  {it.quantity > 1 && <div className={classes.qty}>x{it.quantity}</div>}
                </div>
              </div>

              <div className={classes.right}>${(it.price * it.quantity).toFixed(2)}</div>
            </div>
          ))}

          <div className={classes.items_divider} />
        </div>
      )}

      <div className={classes.details}>
        <div className={classes.detail_item}>
          <span>Subtotal</span>
          <span className={classes.total_price}>${subtotal.toFixed(2)}</span>
        </div>

        {isLoggedIn && (
          <div className={classes.detail_item}>
            <span>Discount (5%)</span>
            <span className={classes.discount_amount}>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className={classes.detail_item}>
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className={classes.line} />

        <div className={classes.detail_item}>
          <span>Total</span>
          <span className={classes.total_price}>${displayTotal.toFixed(2)}</span>
        </div>
      </div>

      <Button onClick={handlePlaceOrderClick} styles={getButtonClass()}>
        Place Order
      </Button>
      {renderError()}
    </div>
  );
}
