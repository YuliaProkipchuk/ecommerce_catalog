"use client";
import classes from "./Carousel.module.scss";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

export function Carousel() {
  return (
    <Swiper
      observer={true}
      observeParents={true}
      spaceBetween={16}
      slidesPerView={3}
      modules={[Navigation]}
      breakpoints={{
        320: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.5 },
        1210: { slidesPerView: 4 },
        1220: { slidesPerView: 4 },
      }}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      loop
    >
      <SwiperSlide>
        {/* replacement for card component */}
        <div className={classes.card}>Slide 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classes.card}>Slide 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classes.card}>Slide 3</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classes.card}>Slide 4</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classes.card}>Slide 5</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classes.card}>Slide 6</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classes.card}>Slide 7</div>
      </SwiperSlide>
    </Swiper>
  );
}
