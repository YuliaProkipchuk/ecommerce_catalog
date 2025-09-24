'use client';

import React from 'react';
import classes from './OrderConfirmationModal.module.scss';
import Link from 'next/link';

interface OrderConfirmationModalProps {
  onClose: () => void;
}

export function OrderConfirmationModal({ onClose }: OrderConfirmationModalProps) {
  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <button onClick={onClose} className={classes.button_close}>
          &times;
        </button>
        <div className={classes.text_content}>
          <h2>Thank you for your purchase!</h2>
          <p>
            Your order has been successfully placed, and we're getting it ready for shipment.
            You'll receive a confirmation email or SMS shortly with all the details.
          </p>
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
        <div className={classes.button_group}>
          <Link href="/" className={classes.action_button} onClick={onClose}>
            Go to Homepage
          </Link>
          <Link href="/contacts" className={classes.action_button} onClick={onClose}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}