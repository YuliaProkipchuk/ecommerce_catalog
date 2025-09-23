import React from 'react';
import classes from './ContentSection.module.scss';

export interface ContentSectionData {
  title: string;
  text: string[];
}

interface ContentSectionProps {
  title: string;
  sections: ContentSectionData[];
}

export const ContentSection: React.FC<ContentSectionProps> = ({ title, sections }) => {

  return (
    <div className={classes.contentSection}>
      <h3 className={classes.sectionTitle}>{title}</h3>
      {sections.map(section => (
        <div className={classes.contentItem} key={section.title}>
          <h4 className={classes.contentItemTitle}>{section.title}</h4>
          <div className={classes.contentItemText}>
            
            {section.text.map((productText, ind) => (
              <p key={ind}>{productText}</p>
            ))}

          </div>
        </div>
      ))}
    </div>
  );
};
