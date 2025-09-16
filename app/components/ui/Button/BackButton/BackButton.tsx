'use client';
import classes from './BackButton.module.scss';
import Image from 'next/image';
import ArrowLeft from '@/public/icons/ArrowLeftActive.svg';
import { useRouter } from 'next/navigation';
export function BackButton() {
  const router = useRouter();
  return (
    <div className={classes.back_btn} onClick={() => router.back()}>
      <Image src={ArrowLeft} alt="arrow left icon" width={16} height={16} />
      <span>Back</span>
    </div>
  );
}
