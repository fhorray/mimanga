import { db } from '@/db/config';
import { users as usersTable, type SelectUser } from '@/db/schemas';
import type { Request } from 'express';
import type { Session } from 'express-session';
import type { CustomSessionData } from 'types/types';

export const findUserById = async (id: string | undefined) => {
  const users: SelectUser[] = await db.select().from(usersTable);
  const findUser = users.find((user) => user.id === id);

  return findUser;
};
