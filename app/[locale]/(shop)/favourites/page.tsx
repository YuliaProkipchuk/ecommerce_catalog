import React from 'react';
import classes from './favourites.module.scss';
import { Layout } from '@/app/components/ui/Layout/Layout';
function Page() {
  return (
    <>
    <section className="section">
        <h1 className={`main-heading`}>Favourites</h1>
        <span className={classes.info}>95 models</span>
      </section>
      <section className="section">
        <Layout />
      </section>
    </>
  );
}

export default Page;