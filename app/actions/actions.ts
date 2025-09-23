'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signInSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type State = {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

type SignUpState = {
  errors: {
    fullName?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export async function signIn(previousState: State, formData: FormData): Promise<State> {
  const data = Object.fromEntries(formData.entries()) as Record<string, string>;

  const validated = signInSchema.safeParse(data);

  if (!validated.success) {
    const formFieldErrors = z.flattenError(validated.error);

    return {
      errors: {
        email: formFieldErrors.fieldErrors.email,
        password: formFieldErrors.fieldErrors.password,
      },
    };
  }

  redirect('/');
}

export async function signUp(previousState: SignUpState, formData: FormData) {
  const authData = Object.fromEntries(formData.entries()) as Record<string, string>;

  const validated = signUpSchema.safeParse(authData);

  if (!validated.success) {
    const formFieldErrors = z.flattenError(validated.error);

    return {
      errors: {
        fullName: formFieldErrors.fieldErrors.fullName,
        email: formFieldErrors.fieldErrors.email,
        password: formFieldErrors.fieldErrors.password,
      },
    };
  }


  redirect('/');
}
