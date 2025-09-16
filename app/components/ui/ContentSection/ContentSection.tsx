import React from 'react';
import classes from './ContentSection.module.scss';

export interface ContentSectionData {
  title: string;
  content: string;
}

interface ContentSectionProps {
  title: string;
  sections: ContentSectionData[];
}

export const ContentSection: React.FC<ContentSectionProps> = ({ title, sections }) => {
  return (
    <div className={classes.contentSection}>
      <h2 className={classes.sectionTitle}>{title}</h2>
      {sections.map((section, index) => (
        <div key={index} className={classes.contentItem}>
          <h3 className={classes.contentItemTitle}>{section.title}</h3>
          <div className={classes.contentItemText}>
            <p>
              {section.content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < section.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
