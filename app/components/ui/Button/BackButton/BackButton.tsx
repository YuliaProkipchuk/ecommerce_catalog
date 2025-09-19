'use client';
import classes from './BackButton.module.scss';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '../../Icons/ArrowLeft';
export function BackButton() {
  const router = useRouter();
  return (
    <div className={classes.back_btn} onClick={() => router.back()}>
      <ArrowLeft />
      <span>Back</span>
    </div>
  );
}
