import React from "react"
import classes from './ColorChangButton.module.scss';

export function ColorChangButton() {
    return (
        
        <div className={classes.activ}>
            <button className={classes.color}></button>
        </div>
    );
}