'use client'

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/stores";
import {initTheme} from "@/app/stores/slices/mainSlice";
import { initFavourites } from "@/app/stores/slices/favouritesSlice";

export function ThemeInit() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(initTheme());
        dispatch(initFavourites())
    }, [dispatch]);

    return null;
}