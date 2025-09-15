import React from "react"
import phoneImage from './Image/Phone.png'
import classes from "./ProductCard.module.scss";
import { AddButton } from "../Button/AddButton/AddButton";
import { LikeButton } from "../Button/LikeButton/LikeButton";

export function ProductCard() {
    return (
        <div className={classes.card}>

            <div className={classes.image} >
                <img src={phoneImage.src} alt="Phone" className={classes.image__img} />
            </div>

            <h4 className={classes.name}>Apple iPhone Xs 64GB Silver (iMT9G2FS/A)</h4>

            <div className={classes.price}>
                <p className={classes.price__current}>$799</p>
                <p className={classes.wrong__price}>$899</p>
            </div>

            <div className={classes.blok}>

                <div className={classes.info__blok}>
                    <p className={classes.parameter}>Screen</p>
                    <p className={classes.info}>5.8” OLED</p>
                </div>

                <div className={classes.info__blok}>
                    <p className={classes.parameter}>Capacity</p>
                    <p className={classes.info}>64 GB</p>
                </div>

                <div className={classes.info__blok}>
                    <p className={classes.parameter}>RAM</p>
                    <p className={classes.info}>4 GB</p>
                </div>
            </div>

            <div className={classes.buttons}>
                <AddButton />
                <LikeButton />
            </div>
        </div>
    );
} 