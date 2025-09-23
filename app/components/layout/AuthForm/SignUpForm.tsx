'use client';
import React, { useActionState } from 'react';
import classes from './AuthForm.module.scss';
import Link from 'next/link';
import { signUp } from '@/app/actions/actions';

export function SignUpForm() {
  const [state, action, isLoading] = useActionState(signUp, {
    errors: { email: undefined, password: undefined, fullName: undefined },
  });
  const text = 'Already have an account? Sign in.';
  return (
    <form action={action} className={classes.form}>
      <h1 className={`heading ${classes.title}`}>Sign Up</h1>

      <div className={classes['input-item']}>
        <label htmlFor="fullName" className={classes.label}>
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="John Donn"
          className={classes.input}
        />
        {state && state.errors.fullName && (
          <span className={classes.form_error}>{state.errors.fullName}</span>
        )}
      </div>

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
      <Link href={'/sign-in'} className={classes.link}>
        {text}
      </Link>
      <button type="submit" className={classes.submit_btn}>
        {isLoading ? 'Loading...' : 'Continue'}
      </button>
    </form>
  );
}
