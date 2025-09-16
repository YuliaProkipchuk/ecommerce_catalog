'use client';
import { useTranslations } from 'next-intl';
import { Header } from '../components/layout/Header/Header';

export default function Home() {
  const t = useTranslations();
  return (
    <main className={'main-container'}>
      <Header />
      <p>{t('test')}</p>
    </main>
  );
}
