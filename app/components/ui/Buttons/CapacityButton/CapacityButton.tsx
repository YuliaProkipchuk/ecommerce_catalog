import React from "react"
import classes from "./CapacityButton.module.scss";
import { useParams } from "next/navigation";
import Link from "next/link";

interface CapacityProps {
    capacity: string[]
    activeCapacity: string
    itemId:string
    activeColor: string
}

export function CapacityButton({capacity, activeCapacity, itemId, activeColor}: CapacityProps) {
    const { category } = useParams();
    
    return (
        <>
        
        {capacity.map(capacity => 
            <Link
            href={`/${category}/${itemId}-${capacity.toLowerCase()}-${activeColor.replace(/ /g, '-')}`}
            key={capacity}
            className={classes.link}
            >
        <div className= {capacity !== activeCapacity ? `${classes.button}` : `${classes.active}`}>
                {capacity}
        </div>
           </Link>
        )}
      
        </>
    );
}