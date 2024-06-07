import { db } from '@/db/config';
import {
  users,
  users as usersTable,
  type InsertUser,
  type SelectUser,
} from '@/db/schemas';
import { eq } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';

import * as bcrypt from 'bcryptjs';

// FIND USER BY ID
const findUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      password: false,
    },
  });
};

// FIND USER BY EMAIL
const findUserByEmail = async (email: string): Promise<SelectUser[] | null> => {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user) return null;

  return user;
};

// GET USERS
const getUsers = async <T extends PgTable>(table: T) => {
  if (!table) {
    throw new Error('No table provided');
  }
  return await db.select().from(table);
};

// UPDATE USER BY ID
const updateUser = async (newData: InsertUser, id: string) => {
  if (newData.password) {
    const salt = await bcrypt.genSalt();
    newData.password = await bcrypt.hash(newData.password, salt);
  }

  const user = await db
    .update(usersTable)
    .set(newData)
    .where(eq(usersTable.id, id))
    .returning({
      id: users.id,
      name: users.name,
      username: users.username,
      email: users.email,
      role: users.role,
    });

  return user;
};

export const userServices = {
  findUserByEmail,
  findUserById,
  getUsers,
  updateUser,
};
