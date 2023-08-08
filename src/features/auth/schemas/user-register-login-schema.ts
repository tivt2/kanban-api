import { z } from 'zod';
import validator from 'validator';

export const user_register_login_schema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Must provide a valid email' })
      .email('Invalid email')
      .max(50, 'Email to long'),
    password: z
      .string()
      .min(8, 'Minimun of 8 characters')
      .refine(
        (pass) => validator.isStrongPassword(pass, { minLength: 8 }),
        'Weak password, provided at least 1 lower, 1 upper, 1 number and 1 special characters',
      ),
  }),
});

export type RequestResultRegisterLogin = z.infer<
  typeof user_register_login_schema
>;
