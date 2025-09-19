'use client';
import React, { useState, useRef, useEffect } from 'react';
import classes from './ItemsPerPageDropdown.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { changeCountItems, getCategoryProducts } from '@/app/stores/slices/productSlice';

interface ItemsPerPageDropdownProps {
  className?: string;
}

export const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { countItemsPage } = useAppSelector((state) => state.products);

  const options = [16, 24, 32, 48];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: number) => {
    dispatch(changeCountItems(option));
    setIsOpen(false);
    // dispatch(getCategoryProducts());
  };

  return (
    <div ref={dropdownRef} className={`${classes.itemsPerPageDropdown} ${className || ''}`}>
      <button
        className={`${classes.button} ${isOpen ? classes.buttonOpen : ''}`}
        onClick={toggleDropdown}
      >
        <span className={classes.text}>{countItemsPage}</span>
        <svg
          className={`${classes.arrow} ${isOpen ? classes.arrowRotated : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z"
            // fill="var(--icon-light)"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={classes.menu}>
          {options.map((option) => (
            <button
              key={option}
              className={`${classes.option} ${countItemsPage === option ? classes.optionSelected : ''}`}
              onClick={() => selectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
