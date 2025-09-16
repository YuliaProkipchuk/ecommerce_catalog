import React from 'react';
import styles from './ProductSpecification.module.scss';
import { ContentSection } from '../../ui/ContentSection/ContentSection';
import { TechSpecs } from '../../ui/TechSpecs/TechSpecs';

interface SpecItem {
  label: string;
  value: string;
}

interface ContentSection {
  title: string;
  content: string;
}

interface ProductSpecificationProps {
  className?: string;
}

export const ProductSpecification: React.FC<ProductSpecificationProps> = ({ className }) => {

  const contentSections: ContentSection[] = [
    {
      title: "And then there was Pro",
      content: "A transformative triple-camera system that adds tons of capability without complexity.\n\nAn unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
    },
    {
      title: "Camera",
      content: "Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You've never shot with anything like it."
    },
    {
      title: "Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.",
      content: "iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with."
    }
  ];

  const techSpecs: SpecItem[] = [
    { label: "Screen", value: "6.5\" OLED" },
    { label: "Resolution", value: "2688x1242" },
    { label: "Processor", value: "Apple A12 Bionic" },
    { label: "RAM", value: "3 GB" },
    { label: "Built in memory", value: "64 GB" },
    { label: "Camera", value: "12 Mp + 12 Mp + 12 Mp (Triple)" },
    { label: "Zoom", value: "Optical, 2x" },
    { label: "Cell", value: "GSM, LTE, UMTS" }
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