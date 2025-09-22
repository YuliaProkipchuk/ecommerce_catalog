import React from 'react';
import styles from './ProductSpecification.module.scss';
import { ContentSection } from '../../ui/ContentSection/ContentSection';
import { TechSpecs } from '../../ui/TechSpecs/TechSpecs';
import { FullProduct } from '@/app/types/fullProduct';

interface SpecItem {
  label: string;
  value: string;
}

interface ContentSection {
  title: string;
  text: string[];
}

interface ProductSpecificationProps {
  className?: string;
  products: FullProduct;
}

export const ProductSpecification: React.FC<ProductSpecificationProps> = ({ className, products }) => {

  const contentSections: ContentSection[] = products.description;
  

  const techSpecs: SpecItem[] = [
    { label: "Screen", value: products.screen },
    { label: "Resolution", value: products.resolution },
    { label: "Processor", value: products.processor },
    { label: "RAM", value: products.ram },
    { label: "Built in memory", value: products.capacity },
    { label: "Camera", value: products.camera },
    { label: "Zoom", value: products.zoom },
    { label: "Cell", value: products.cell.join(', ') }
  ];

  return (
    <div className={`${styles.productSpecification} ${className || ''}`}>
      <div className={styles.contentColumn}>
        <ContentSection title="About" sections={contentSections} />
      </div>
      <div className={styles.specsColumn}>
        <TechSpecs title="Tech specs" specs={techSpecs} />
      </div>
    </div>
  );
};