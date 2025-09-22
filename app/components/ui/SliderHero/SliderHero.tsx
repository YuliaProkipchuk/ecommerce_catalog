'use client'
import cs from './SliderHero.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import React, {useEffect, useRef, useState} from "react";

export const SliderHero = () => {
    const [currentWidth, setCurrentWidth] = useState<number>(0);
    const swiperRef = useRef<any>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const handleSlider = (method: 'next' | 'prev') => {
        if (method === 'next') {
            swiperRef.current.slideNext()
            return
        }
        swiperRef.current.slidePrev()
    }
    useEffect(() => {
        setCurrentWidth(window.innerWidth)
    }, []);
    const goToSlide = (index: number) => {
        swiperRef.current?.slideToLoop(index)
    }
    return (
        <>
            <div className={cs.container_slider}>
                <button onClick={() => handleSlider('prev')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                              fill="var(--icon-light)"/>
                    </svg>
                </button>
                <Swiper pagination={true} loop={true} className="main-slider-hero"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    <SwiperSlide className={'slide-slider-content'}>
                        {currentWidth < 640 &&
                            <Image src={'/banners/iPhone-17-Pro.jpg'} width={1400} height={791} sizes="100vw"
                                   alt="Image slider Hero"
                                   style={{width: '100%', height: 'auto'}}/>}
                        {(currentWidth >= 640 && currentWidth <= 1200) &&
                            <Image src={'/banners/iPhone-17-Pro.jpg'} width={1400} height={791} sizes="100vw"
                                   alt="Image slider Hero"
                                   style={{width: '100%', height: 'auto'}}/>}
                        {(currentWidth >= 1200) &&
                            <Image src={'/banners/iPhone-17-Pro.jpg'} width={1400} height={791} sizes="100vw"
                                   alt="Image slider Hero"
                                   style={{width: '100%', height: 'auto'}}/>}
                    </SwiperSlide>
                    <SwiperSlide className={'slide-slider-content'}>
                        <div className="container-first-slider">
                            {currentWidth < 640 &&
                                <Image src={'/banners/iphone-15.jpg'} width={1400} height={791} sizes="100vw"
                                       alt="Image slider Hero"
                                       style={{width: '100%', height: 'auto'}}/>}
                            {(currentWidth >= 640 && currentWidth <= 1200) &&
                                <Image src={'/banners/iphone-15.jpg'} width={1400} height={791} sizes="100vw"
                                       alt="Image slider Hero"
                                       style={{width: '100%', height: 'auto'}}/>}
                            {(currentWidth >= 1200) &&
                                <Image src={'/banners/iphone-15.jpg'} width={1400} height={791} sizes="100vw"
                                       alt="Image slider Hero"
                                       style={{width: '100%', height: 'auto'}}/>}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={'slide-slider-content'}>
                        <div className="container-first-slider">
                            {currentWidth < 640 &&
                                <Image src={'/banners/apples-iphone-15-m_2.jpg'} width={1400} height={791} sizes="100vw"
                                       alt="Image slider Hero"
                                       style={{width: '100%', height: 'auto'}}/>}
                            {(currentWidth >= 640 && currentWidth <= 1200) &&
                                <Image src={'/banners/apples-iphone-15-m_2.jpg'} width={1400} height={791} sizes="100vw"
                                       alt="Image slider Hero"
                                       style={{width: '100%', height: 'auto'}}/>}
                            {(currentWidth >= 1200) &&
                                <Image src={'/banners/apples-iphone-15-m_2.jpg'} width={1400} height={791} sizes="100vw"
                                       alt="Image slider Hero"
                                       style={{width: '100%', height: 'auto'}}/>}
                        </div>
                    </SwiperSlide>
                </Swiper>
                <button  onClick={() => handleSlider('next')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                              fill="var(--icon-light)"/>
                    </svg>
                </button>
            </div>
            <div className={cs.pagination_custom_hero}>
                <div className={'flex-pag-slider'}>
                    <button
                        onClick={() => goToSlide(0)}
                        className={`${activeIndex === 0 ? 'active-pag-btn' : 'def-pag-btn'}`}
                    />
                    <button
                        onClick={() => goToSlide(1)}
                        className={`${activeIndex === 1 ? 'active-pag-btn' : 'def-pag-btn'}`}
                    />
                    <button
                        onClick={() => goToSlide(2)}
                        className={`${activeIndex === 2 ? 'active-pag-btn' : 'def-pag-btn'}`}
                    />
                </div>
            </div>
        </>
    )
}
