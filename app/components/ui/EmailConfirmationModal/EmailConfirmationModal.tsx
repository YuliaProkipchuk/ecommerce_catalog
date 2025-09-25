'use client';

import classes from './EmailConfirmationModal.module.scss';
import Link from 'next/link';

interface EmailConfirmationModalProps {
  onClose: () => void;
}

export function EmailConfirmationModal({ onClose }: EmailConfirmationModalProps) {
  return (
    <>
      <div className={classes.modalOverlay}>
        <div className={classes.modalContent}>
          <button onClick={onClose} className={classes.button_close}>
            &times;
          </button>
      
          <div className={classes.text}>
            <h2>Confirm Your Email</h2>
            <p>A confirmation email has been sent to your address. Please check your inbox and spam folder to complete your registration.</p>
            <Link href={`/`} className={classes.home_button} onClick={onClose}>
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
