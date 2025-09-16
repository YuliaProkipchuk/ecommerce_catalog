
import Link from 'next/link'
import React from 'react'
import classes from './components/ui/PageNotFound/NotFound.module.scss';

 
export default function NotFound() {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Not Found</h2>
      <p className={classes.description}>Could not find requested resource</p>
      <Link href="/" className={classes.homeLink}>Return Home</Link>
    </div>
  )
}