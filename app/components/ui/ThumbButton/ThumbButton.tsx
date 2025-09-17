import Image from 'next/image';
import React from 'react';
import ItemImg from '../ProductCard/Image/Phone.png';
import classes from './ThumbButton.module.scss';
type PropType = {
  selected: boolean;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick } = props;

  return (
    <div
      className={`${classes.thumbs_slide} ${selected ? classes['thumbs_slide-selected'] : ''}`}
      onClick={onClick}
    >
      <Image
        src={ItemImg}
        alt="item image"
        fill
        className={classes.slider_image}
      />
    </div>
  );
};
