import React from 'react';
import { SortDropdown } from '../SortDropdown/SortDropdown';
import { ItemsPerPageDropdown } from '../ItemsPerPageDropdown/ItemsPerPageDropdown';
import classes from './FilterControls.module.scss';

interface FilterControlsProps {
  className?: string;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ className }) => {
  return (
    <div className={`${classes.filterControls} ${className || ''}`}>
      <div className={classes.section}>
        <label className={classes.label}>Sort by</label>
        <SortDropdown />
      </div>
      
      <div className={classes.section}>
        <label className={classes.label}>Items on page</label>
        <ItemsPerPageDropdown />
      </div>
    </div>
  );
};