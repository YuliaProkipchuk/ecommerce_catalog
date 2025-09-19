'use client'

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/stores";
import {initTheme} from "@/app/stores/slices/mainSlice";

export function ThemeInit() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(initTheme());
    }, [dispatch]);

    return null;
}