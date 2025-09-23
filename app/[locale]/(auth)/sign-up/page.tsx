import { SignUpForm } from '@/app/components/layout/AuthForm/SignUpForm';
import React from 'react';
import classes from './SignUp.module.scss';
function SignUp() {
  return (
    <section className={`section ${classes.wrapper}`}>
      <SignUpForm />
    </section>
  );
}

export default SignUp;
