'use client';

import { useCallback, useEffect, useState } from 'react';

import ItemImg from '../ProductCard/Image/Phone.png';

import Image from 'next/image';
import classes from './ThumbsGallery.module.scss';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from '../ThumbButton/ThumbButton';
export function ThumbsGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={classes.gallery}>
      <div className={classes.gallery_viewport} ref={emblaMainRef}>
        <div className={classes.gallery_container}>
          {Array.from(Array(5).keys()).map((index) => (
            <div className={classes.gallery_slide} key={index}>
              <div className={classes.gallery_slideItem}>
                <Image src={ItemImg} alt="item image" fill className={classes.slider_image} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.thumbs}>
        <div className={classes.thumbs_viewport} ref={emblaThumbsRef}>
          <div className={classes.thumbs_container}>
            {Array.from(Array(5).keys()).map((index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
