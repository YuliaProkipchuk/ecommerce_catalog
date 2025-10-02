'use client';

import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import classes from './CheckoutPage.module.scss';
import cs from '../../ui/Modal/Modal.module.scss';
import { CheckoutForm } from '@/app/components/ui/CheckoutForm/CheckoutForm';
import { OrderSummary } from '@/app/components/ui/OrderSummary/OrderSummary';
import { RootState } from '@/app/stores';
import { BackButton } from '../../ui/Buttons/BackButton/BackButton';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { clearCart } from '@/app/stores/slices/cartSlice';
import { resetForm } from '@/app/stores/slices/checkoutFormSlice';
import { Modal } from '../../ui/Modal/Modal';

import Link from 'next/link';
import { Button } from '../../ui/Buttons/Button/Button';

export function CheckoutPage() {
  const router = useRouter();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const { session } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = session ? true : false;
  const itemsShort = useMemo(
    () =>
      cartItems.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
      })),
    [cartItems],
  );

  const subtotal = useMemo(
    () => itemsShort.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [itemsShort],
  );

  const shipping = 15.0;

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handlePlaceOrder = () => {
    if (isFormValid) {
      setShowOrderConfirmation(true);
      dispatch(clearCart());
      dispatch(resetForm());
    }
  };

  const handleCloseOrderConfirmation = (href = '/') => {
    setShowOrderConfirmation(false);
    router.push(href);
  };

  return (
    <div className={classes.cart_page}>
      <BackButton />
      <h1 className={classes.title}>Checkout</h1>
      <div className={classes.content}>
        <div className={classes.checkout_form_section}>
          <CheckoutForm onValidationChange={handleFormValidationChange} />
        </div>

        <div className={classes.order_summary_section}>
          <OrderSummary
            items={itemsShort}
            subtotal={subtotal}
            shipping={shipping}
            isLoggedIn={isLoggedIn}
            isFormValid={isFormValid}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>

      {showOrderConfirmation && (
        <Modal onClose={handleCloseOrderConfirmation}>
          <div className={classes.text_content}>
            <h2>Thank you for your purchase!</h2>
            <p>
              Your order has been successfully placed, and we're getting it ready for shipment.
              You'll receive a confirmation email or SMS shortly with all the details.
            </p>
            <p>If you have any questions, feel free to contact our support team.</p>
          </div>
          <div className={classes.button_group}>
            <Button styles={classes.action_button} onClick={handleCloseOrderConfirmation}>
              Go to Homepage
            </Button>
            <Button
              styles={classes.action_button}
              onClick={() => handleCloseOrderConfirmation('/contacts')}
            >
              Contact Us
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
