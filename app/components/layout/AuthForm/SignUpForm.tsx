'use client';
import React, { useEffect, useState } from 'react';
import classes from './AuthForm.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import z from 'zod';
import { clearError, register } from '@/app/stores/slices/authSlice';
import cs from '../../ui/Modal/Modal.module.scss';
import { Modal } from '../../ui/Modal/Modal';
const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export function SignUpForm() {
  const [errors, setErrors] = useState<{
    email: string[] | undefined;
    password: string[] | undefined;
    fullName: string[] | undefined;
  }>();
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);
  const router = useRouter();
  const { error, isPending } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const validated = signUpSchema.safeParse({ email, password, fullName });

    if (!validated.success) {
      const formFieldErrors = z.flattenError(validated.error);
      setErrors(() => ({
        email: formFieldErrors.fieldErrors.email,
        password: formFieldErrors.fieldErrors.password,
        fullName: formFieldErrors.fieldErrors.fullName,
      }));
      return {
        errors: {
          email: formFieldErrors.fieldErrors.email,
          password: formFieldErrors.fieldErrors.password,
          fullName: formFieldErrors.fieldErrors.fullName,
        },
      };
    }
    try {
      await dispatch(register({ email, password, full_name: fullName })).unwrap();
      setShowEmailConfirmationModal(true);
    } catch (error) {
      console.log(email, password);
    }
  }

  const closeEmailConfirmationModal = () => {
    setShowEmailConfirmationModal(false);
    router.replace('/');
  };

  const text = 'Already have an account? Sign in.';
  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
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
          {errors && errors.fullName && (
            <span className={classes.form_error}>{errors.fullName}</span>
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
            placeholder="password"
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
        {error && <span className={classes.form_error}>{error}</span>}

        <Link href={'/sign-in'} className={classes.link}>
          {text}
        </Link>
        <button type="submit" className={classes.submit_btn}>
          {isPending ? 'Loading...' : 'Continue'}
        </button>
      </form>
      {showEmailConfirmationModal && (
        <Modal onClose={closeEmailConfirmationModal}>
          <div className={cs.text}>
            <h2>Confirm Your Email</h2>
            <p>
              A confirmation email has been sent to your address. Please check your inbox and spam
              folder to complete your registration.
            </p>
            <Link href={`/`} className={cs.home_button} onClick={closeEmailConfirmationModal}>
              Go to Home Page
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
}
