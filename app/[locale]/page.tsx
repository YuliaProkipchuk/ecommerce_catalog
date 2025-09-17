'use client';
import {Header} from '../components/layout/Header/Header';
import {ProductCastomization} from '../components/ui/ProductCastomization/ProductCastomization';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/stores";
import {useEffect} from "react";
import {getProductsStore} from "@/app/stores/slices/productSlice";
import {HeroSection} from "@/app/components/layout/HeroSection/HeroSection";


export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const {products} = useSelector((state: RootState) => state.products)
    useEffect(() => {
        dispatch(getProductsStore())
    }, [dispatch]);
    return (
        <main className={'main-container'}>
            <Header/>
            <HeroSection/>
        </main>
    );
}
