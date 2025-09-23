'use client';
import React, { useActionState } from 'react';
import classes from './AuthForm.module.scss';
import Link from 'next/link';
import { signIn } from '@/app/actions/actions';

export function SignInForm() {
  const [state, action, isLoading] = useActionState(signIn, {
    errors: { email: undefined, password: undefined },
  });
  console.log(state);
  const text = 'Create new account';
  return (
    <form action={action} className={classes.form}>
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
        {state.errors.email && (
          <div className={classes.errors}>
            {state.errors.email.map((err, i) => (
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
        {state.errors.password && (
          <div className={classes.errors}>
            {state.errors.password.map((err, i) => (
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
