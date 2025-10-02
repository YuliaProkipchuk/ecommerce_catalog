'use client';

import classes from './Modal.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ onClose, children }: ModalProps) {
  return (
    <>
      <div className={classes.modalOverlay}>
        <div className={classes.modalContent}>
          <button onClick={onClose} className={classes.button_close}>
            &times;
          </button>

          {children}
        </div>
      </div>
    </>
  );
}
