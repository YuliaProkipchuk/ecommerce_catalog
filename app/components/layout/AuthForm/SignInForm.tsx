'use client';
import React, { useActionState, useState } from 'react';
import classes from './AuthForm.module.scss';
import Link from 'next/link';
import { useAppDispatch } from '@/app/stores/hooks';
import { login } from '@/app/stores/slices/authSlice';
import z from 'zod';
import { useRouter } from 'next/navigation';
export const signInSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export function SignInForm() {
  const [errors, setErrors] = useState<{
    email: string[] | undefined;
    password: string[] | undefined;
  }>();
  const router = useRouter()
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const validated = signInSchema.safeParse({ email, password });

    if (!validated.success) {
      const formFieldErrors = z.flattenError(validated.error);
      setErrors(() => ({
        email: formFieldErrors.fieldErrors.email,
        password: formFieldErrors.fieldErrors.password,
      }));
      return {
        errors: {
          email: formFieldErrors.fieldErrors.email,
          password: formFieldErrors.fieldErrors.password,
        },
      };
    }
    await dispatch(login({ email, password })).unwrap();
    setLoading(false);
    router.replace('/')
  }
  const text = 'Create new account';
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h1 className={`heading ${classes.title}`}>Sign In</h1>

      <div className={classes['input-item']}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="johndonn@gmail.com"
          className={classes.input}
        />
        {errors && errors.email && (
          <div className={classes.errors}>
            {errors.email.map((err, i) => (
              <span className={classes.form_error} key={i}>
                {err}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={classes['input-item']}>
        <label htmlFor="password" className={classes.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="1234"
          className={classes.input}
        />
        {errors && errors.password && (
          <div className={classes.errors}>
            {errors.password.map((err, i) => (
              <span className={classes.form_error} key={i}>
                {err}
              </span>
            ))}
          </div>
        )}
      </div>
      <Link href={'/sign-up'} className={classes.link}>
        {text}
      </Link>
      <button type="submit" className={classes.submit_btn}>
        {isLoading ? 'Loading...' : 'Continue'}
      </button>
    </form>
  );
}
