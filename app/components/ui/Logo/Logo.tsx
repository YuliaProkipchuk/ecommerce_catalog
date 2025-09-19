'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '@/app/stores/hooks';

type Props = {
  width: number;
  height: number;
};
export function Logo({ width, height }: Props) {
  const theme = useAppSelector((state) => state.main.theme);
  const link = theme === 'light' ? '/logo.svg' : '/logoLight.svg';
  return (
    <Link href="/">
      <Image src={link} width={width} height={height} alt="Nice Gadgets logo" />
    </Link>
  );
}
