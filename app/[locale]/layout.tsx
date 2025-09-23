import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { Header } from '../components/layout/Header/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { BreadCrumbs } from '../components/ui/BreadCrumbs/BreadCrumbs';
import { ThemeProvider } from '../ThemeProvider';
import { ThemeInit } from "@/app/components/ui/ThemeInit/ThemeInit";
import { CartInit } from '@/app/components/ui/CartInit/CartInit';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Nice Gadgets',
    description: 'Your one-stop shop for the latest and greatest in tech gadgets.',
    
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let messages: Record<string, string> | undefined;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ThemeInit/>
            <CartInit />
            <Header />
            <main className="main">
              <BreadCrumbs />
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
