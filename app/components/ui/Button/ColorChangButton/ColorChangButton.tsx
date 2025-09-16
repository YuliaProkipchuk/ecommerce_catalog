import React from "react"
import classes from './ColorChangButton.module.scss';

export function ColorChangButton() {
    return (
        
        <div className={classes.button}>
            <button className={classes.color}></button>
        </div>
    );
}