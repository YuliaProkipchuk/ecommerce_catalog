'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '@/app/types/product';

type CarouselProps = {
  slides: Product[] | Omit<Product, 'id' | 'year'>[];
  leftBtnClass: string;
  rightBtnClass: string;
};

export function Carousel({ slides, leftBtnClass, rightBtnClass }: CarouselProps) {
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
        nextEl: `.${rightBtnClass}`,
        prevEl: `.${leftBtnClass}`,
      }}
      loop
    >
      {slides.slice(0, 10).map((product, idx) => (
        <SwiperSlide key={idx}>
          <div className="card_dynamic">
            <ProductCard product={product} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
