import { z } from 'zod';

export const user_refresh_logout_schema = z.object({
  cookies: z.object({
    refresh_token: z
      .string({ required_error: 'Invalid token' })
      .min(1, 'Invalid token'),
  }),
});

export type RequestResultRefreshLogout = z.infer<
  typeof user_refresh_logout_schema
>;
