import type { SelectUser } from '@/db/schemas';
import * as bcrypt from 'bcryptjs';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const hashPassword = async (res: Response, newUserData: SelectUser) => {
  // hash the password
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(newUserData.password, salt);
};
