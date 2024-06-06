import { findUserById } from '@/utils/users';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from 'types/types';

// LOGGED USER INFO
export const me = async (req: CustomRequestData, res: Response) => {
  const userId = req.session.passport?.user;
  const user = await findUserById(userId);

  res.status(StatusCodes.OK).json({ message: 'YOUR USER STATUS', user });
};
