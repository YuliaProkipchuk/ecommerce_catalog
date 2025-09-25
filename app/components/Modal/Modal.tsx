'use client';

import classes from './Modal.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface ModalProps {
  onClose: () => void;
}

export function Modal({ onClose }: ModalProps) {
  return (
    <>
      <div className={classes.modalOverlay}>
        <div className={classes.modalContent}>
          <button onClick={onClose} className={classes.button_close}>
            &times;
          </button>
      
          <div className={classes.text}>
            <h2>Discount of 5% after authorization</h2>
            <p>Sign up to our store and get a 5% discount on your total purchases.</p>
            <Link href={`/sign-up`} className={classes.signUp_button}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
