import { findUserById } from '@/utils/users';
import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from 'types/types';

export const isAdmin = async (
  req: CustomRequestData,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.isAuthenticated())
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'PLEASE LOGIN FIRST' });

    const id = req.session.passport?.user;
    const user = await findUserById(id);

    if (!user || user.role !== 'admin') {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'UNAUTHORIZED/NOT ADMIN' });
    }

    console.log(`Welcome, ${user?.name}`);
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'BAD REQUEST' });
  }
};
