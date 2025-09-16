import React from "react"
import classes from './UpButton.module.scss';

export function UpButton() {
    return (
        
        <button className={classes.button}>
            <div className={classes.up}></div>
        </button>
    );
}