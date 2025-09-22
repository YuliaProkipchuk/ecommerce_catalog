'use client';
import {HeroSection} from "@/app/components/layout/HeroSection/HeroSection";
import {HeroCategory} from '../components/layout/HeroCategory/HeroCategory';
import {ProductsCarousel} from '../components/layout/ProductsCarousel/ProductsCarousel';
import {useDispatch } from 'react-redux';
import {AppDispatch } from '@/app/stores';
import {useEffect} from 'react';
import {getProductsStore} from '@/app/stores/slices/productSlice';
import {getProductsSupa} from "@/app/helpers/supabase/products/getProducts";
import {getPhones} from "@/app/helpers/supabase/products/phones";
import {getAcc} from "@/app/helpers/supabase/products/getAcc";
import {getTablets} from "@/app/helpers/supabase/products/getTablets";

export default function Home() {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getProductsStore());
        getProductsSupa()
        getPhones()
        getAcc()
        getTablets()
    }, [dispatch]);

    return (
        <>

            <section className="section"><HeroSection/></section>

            <section className="section">
                <ProductsCarousel title="Brand new models" param="year"/>
            </section>
            <section className="section">
                <HeroCategory/>
            </section>
            <section className="section">
                <ProductsCarousel title="Hot prices" param="price"/>
            </section>
        </>
    );
}
