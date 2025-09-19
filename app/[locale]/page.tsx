'use client';
import {HeroSection} from "@/app/components/layout/HeroSection/HeroSection";
import {HeroCategory} from '../components/layout/HeroCategory/HeroCategory';
import {ProductsCarousel} from '../components/layout/ProductsCarousel/ProductsCarousel';
import {useDispatch } from 'react-redux';
import {AppDispatch } from '@/app/stores';
import {useEffect} from 'react';
import {getProductsStore} from '@/app/stores/slices/productSlice';
import {Pagination} from "@/app/components/ui/Pagination/Pagination";

export default function Home() {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getProductsStore());
    }, [dispatch]);
    return (
        <>

            <section className="section"><HeroSection/></section>

            <section className="section">
                <ProductsCarousel title="Brand new models"/>
            </section>
            <section className="section">
                <HeroCategory/>
            </section>
            <section className="section">
                <ProductsCarousel title="Hot prices"/>
            </section>
        </>
    );
}
