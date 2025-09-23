'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './BreadCrumbs.module.scss';
import { useTranslations } from 'next-intl';
import { Home } from '../Icons/Home';
import { ArrowRight } from '../Icons/ArrowRight';

export function BreadCrumbs() {
  const pathname = usePathname();
  const t = useTranslations();
  const segments = pathname.split('/').slice(2);
  if (
    segments.length === 0 ||
    segments.includes('cart') ||
    segments.includes('sign-in') ||
    segments.includes('sign-up')
  ) {
    return;
  }

  function transformName(name: string) {
    return name
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
  const buildPath = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };
  return (
    <ul className={classes.breadcrumb}>
      <li>
        <Link href={'/'}>
          <Home />
        </Link>
      </li>
      {segments.map((seg, i) => (
        <li key={i} className={classes.segment}>
          <ArrowRight disabled />
          <Link href={buildPath(i)}>
            {i === segments.length - 1 && segments.length > 1
              ? transformName(seg)
              : t(`links.${seg}`)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
