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
  if (segments.length === 0) {
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
          <Home />
        </Link>
      </li>
      {segments.map((seg, i) => (
        <li key={i} className={classes.segment}>
          <ArrowRight disabled/>
          <Link href={buildPath(i)}>{t(`links.${seg}`)}</Link>
        </li>
      ))}
    </ul>
  );
}
