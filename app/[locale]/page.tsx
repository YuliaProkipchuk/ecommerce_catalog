'use client';
import { useTranslations } from 'next-intl';
import { Header } from '../components/layout/Header/Header';
import { ProductCastomization } from '../components/ui/ProductCastomization/ProductCastomization';


export default function Home() {
  const t = useTranslations();
  return (
    <main className={'main-container'}>
      <Header />
      {/* <p>{t('test')}</p> */}
      <ProductCastomization />
    </main>
  );
}
