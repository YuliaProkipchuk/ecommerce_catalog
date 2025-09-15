import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';

const messagesMap: Record<string, any> = {
  en: () => import('@/messages/en.json'),
  uk: () => import('@/messages/uk.json'),
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!messagesMap[locale]) {
    notFound();
  }

  const messages = (await messagesMap[locale]()).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
