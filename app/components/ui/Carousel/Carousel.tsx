'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard/ProductCard';

type CarouselProps = {
  slides?: React.ReactNode[];
};

export function Carousel({ slides }: CarouselProps) {
  const defaultSlides = [
    'Slide 1',
    'Slide 2',
    'Slide 3',
    'Slide 4',
    'Slide 5',
    'Slide 6',
    'Slide 7',
  ];

  const content = slides ?? defaultSlides;

  return (
    <Swiper
      observer={true}
      observeParents={true}
      spaceBetween={16}
      slidesPerView={3}
      modules={[Navigation]}
      breakpoints={{
        320: { slidesPerView: 1.35 },
        450: { slidesPerView: 2 },
        640: { slidesPerView: 2.5 },
        1200: { slidesPerView: 4 },
      }}
      navigation={{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }}
      loop
    >
      {content.map((_, idx) => (
        <SwiperSlide key={idx}>
          <ProductCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
