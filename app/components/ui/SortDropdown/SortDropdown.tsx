import React, { useState, useRef, useEffect } from 'react';
import classes from './SortDropdown.module.scss';

interface SortDropdownProps {
  className?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Newest');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ['Newest', 'Oldest', 'Lowest to Highest', 'Highest to Lowest'];

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
    <div ref={dropdownRef} className={`${classes.sortDropdown} ${className || ''}`}>
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