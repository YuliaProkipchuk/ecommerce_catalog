'use client';
import { useTranslations } from 'next-intl';
import { ProductsCarousel } from '../components/layout/ProductsCarousel/ProductsCarousel';
import { HeroCategory } from '../components/layout/HeroCategory/HeroCategory';

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <section className="section">
        <div className="fakeSimulatedDiv"></div>
      </section>
      <section className="section">
        <ProductsCarousel title="Brand new models" />
      </section>
      <section>
        <HeroCategory />
      </section>
      <section className="section">
        <ProductsCarousel title="Hot prices" />
      </section>
    </>
  );
}
