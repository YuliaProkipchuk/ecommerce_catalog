import React from 'react';
import { SortDropdown } from '../SortDropdown/SortDropdown';
import { ItemsPerPageDropdown } from '../ItemsPerPageDropdown/ItemsPerPageDropdown';
import classes from './FilterControls.module.scss';
import { FilterInput } from '../FilterInput/FilterInput';

interface FilterControlsProps {
  className?: string;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ className }) => {
  return (
    <div className={`${classes.filterControls} ${className || ''}`}>
      <div className={classes.dropdown}>
      <div className={classes.section}>
        <label className={classes.label}>Sort by</label>
        <SortDropdown />
      </div>
      
      <div className={classes.section}>
        <label className={classes.label}>Items on page</label>
        <ItemsPerPageDropdown />
      </div>
      </div>

      <div className={classes.input}>
        <FilterInput />
      </div>
    </div>
  );
};