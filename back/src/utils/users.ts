import { db } from '@/db/config';
import { users, users as usersTable, type SelectUser } from '@/db/schemas';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

// FIND USER BY ID
export const findUserById = async (id: string | undefined) => {
  const users: SelectUser[] = await db.select().from(usersTable);
  const findUser = users.find((user) => user.id === id);

  return findUser;
};

// FIND USER BY EMAIL
export const findUserByEmail = async (
  email: string,
): Promise<SelectUser[] | null> => {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user) return null;

  return user;
};

// VALIDADE USER PASSWORD
export const validatePassword = async (user: SelectUser, password: string) => {
  // Implemente a validação da senha
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) return true;

  return false;
};
