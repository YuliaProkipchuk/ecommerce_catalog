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
      <h3 className={classes.sectionTitle}>{title}</h3>
      {sections.map((section, index) => (
        <div key={index} className={classes.contentItem}>
          <h4 className={classes.contentItemTitle}>{section.title}</h4>
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
