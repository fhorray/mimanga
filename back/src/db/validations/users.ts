import { createInsertSchema } from 'drizzle-zod';
import { users } from '../schemas';

// ZOD SCHEMAS
const insertUserSchema = createInsertSchema(users);
export const refineInsertUserSchema = insertUserSchema.refine(
  (data) => data.provider !== 'local' || data.provider === null,
  {
    message: 'Password cannot be null when provider is local',
    path: ['password'],
  },
);
