import React from 'react';
import classes from './SignIn.module.scss';
import { SignInForm } from '@/app/components/layout/AuthForm/SignInForm';
function SignIn() {
  return (
    <section className={`section ${classes.wrapper}`}>
      <SignInForm />
    </section>
  );
}

export default SignIn;
