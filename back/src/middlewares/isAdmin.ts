import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from '@/types/types';
import { userServices } from '@/services/userServices';

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
    const user = await userServices.findUserById(id);

    if (!user || user.role !== 'admin') {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'UNAUTHORIZED/NOT ADMIN' });
    }

    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'BAD REQUEST' });
  }
};
