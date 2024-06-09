import type { SelectUser } from '@/db/schemas';
import * as bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';

export const hashPassword = async (newUserData: SelectUser) => {
  if (!newUserData || !newUserData.password) {
    throw new Error('No data provided');
  }

  // hash the password
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(newUserData.password, salt);
};
