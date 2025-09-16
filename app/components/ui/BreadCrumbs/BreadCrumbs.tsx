'use client';
import Image from 'next/image';
import Link from 'next/link';
import HomeIcon from '@/public/icons/Home.svg';
import ArrowRightIcon from '@/public/icons/ArrowRight.svg';
import { usePathname } from 'next/navigation';
import classes from './BreadCrumbs.module.scss';
import { useTranslations } from 'next-intl';

export function BreadCrumbs() {
  const pathname = usePathname();
  const t = useTranslations();
  const segments = pathname.split('/').slice(2);
  if (segments.length === 0 || segments.includes('cart')) {
    return;
  }

  function transformName(name: string) {
    return name
      .split('-')
      .map((word) => t(`links.${word}`))
      .join(' ');
  }
  const buildPath = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };
  return (
    <ul className={classes.breadcrumb}>
      <li>
        <Link href={'/'}>
          <Image src={HomeIcon} alt="Home icon" width={16} height={16} />
        </Link>
      </li>
      {segments.map((seg, i) => (
        <li key={i} className={classes.segment}>
          <Image src={ArrowRightIcon} alt="arrow right icon" width={16} height={16} />
          <Link href={buildPath(i)}>{transformName(seg)}</Link>
        </li>
      ))}
    </ul>
  );
}
