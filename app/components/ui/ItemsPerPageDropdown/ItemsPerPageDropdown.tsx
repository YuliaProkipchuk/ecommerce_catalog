import React, { useState, useRef, useEffect } from 'react';
import classes from './ItemsPerPageDropdown.module.scss';

interface ItemsPerPageDropdownProps {
  className?: string;
}

export const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('16');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ['16', '32', '48', '64'];

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

  const selectOption = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`${classes.itemsPerPageDropdown} ${className || ''}`}>
      <button 
        className={`${classes.button} ${isOpen ? classes.buttonOpen : ''}`}
        onClick={toggleDropdown}
      >
        <span className={classes.text}>{selectedValue}</span>
        <svg 
          className={`${classes.arrow} ${isOpen ? classes.arrowRotated : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <use href="/icons/ArrowDown.svg" />
        </svg>
      </button>
      
      {isOpen && (
        <div className={classes.menu}>
          {options.map((option) => (
            <button
              key={option}
              className={`${classes.option} ${selectedValue === option ? classes.optionSelected : ''}`}
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