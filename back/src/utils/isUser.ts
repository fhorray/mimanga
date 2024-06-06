import type { NextFunction, Request, Response } from 'express';
import type { Session } from 'express-session';
import type { CustomRequestData } from 'types/types';
import { findUserById } from './users';
import { StatusCodes } from 'http-status-codes';

export const isUser = async (
  req: CustomRequestData,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.session.passport?.user;
    const user = await findUserById(id);

    if (!req.isAuthenticated() && user?.role !== 'user') {
      res.status(StatusCodes.UNAUTHORIZED).json({ messasge: 'UNAUTHORIZED' });
    }

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ messasge: 'UNAUTHORIZED' });
  }
};
