import { RequestValidator } from '../../shared/request-validator/request-validator.service';
import { z } from 'zod';

const user_auth_access_schema = z.object({
  headers: z.object({
    authorization: z
      .string({ required_error: 'Invalid token' })
      .refine((token) => {
        const bearer = token.substring(7);
        return token.startsWith('Bearer ') && bearer.length > 0;
      }, 'Invalid token')
      .transform((bearer) => bearer.substring(7)),
  }),
});

type RequestResultAuthAccess = z.infer<typeof user_auth_access_schema>;

export class AuthAccessRequest extends RequestValidator<RequestResultAuthAccess> {
  constructor() {
    super(user_auth_access_schema);
  }
}
