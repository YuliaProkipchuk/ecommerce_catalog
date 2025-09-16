import React from 'react';
import classes from './TechSpecs.module.scss';

export interface SpecItem {
  label: string;
  value: string;
}

interface TechSpecsProps {
  title: string;
  specs: SpecItem[];
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ title, specs }) => {
  return (
    <div className={classes.techSpecs}>
      <h2 className={classes.sectionTitle}>{title}</h2>
      <div className={classes.specsList}>
        {specs.map((spec, index) => (
          <div key={index} className={classes.specItem}>
            <span className={classes.specLabel}>{spec.label}</span>
            <span className={classes.specValue}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};