import { z } from 'zod';

export const project_leave_join_connect_schema = z.object({
  params: z.object({
    project_id: z
      .string({ required_error: 'Please provide a project id' })
      .min(1, 'Please provide a project id'),
  }),
  body: z.object({
    user_id: z.string(),
  }),
});

export type RequestResultProjectLeaveJoinConnect = z.infer<
  typeof project_leave_join_connect_schema
>;
