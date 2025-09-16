'use client';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  return (
    <main className={'main-container'}>
      <p>{t('test')}</p>
    </main>
  );
}
