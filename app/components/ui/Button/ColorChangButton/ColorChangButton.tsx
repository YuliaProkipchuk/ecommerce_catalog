'use client';

import React from "react"
import classes from './ColorChangButton.module.scss';
import Link from "next/link";
import { useParams } from "next/navigation";

interface ColorProps {
    colors: string[],
    activeColor: string
    itemId:string
    activeCapacity: string
}

export function ColorChangButton({ colors, activeColor, itemId, activeCapacity }: ColorProps) {
    const { category } = useParams();

    return (
        <>
            {colors.map(color => (
                <div className={color !== activeColor ? `${classes.button}` : `${classes.active}`} key={color}>
                    <Link href={`/${category}/${itemId}-${activeCapacity.toLowerCase()}-${color.replace(/ /g, '-')}`} className={classes.colors}>
                    <button className={`${classes.colors} ${classes[color.replace(/ /g, '')]}`} ></button>
                    </Link>
                </div>
            ))}</>
    );
}