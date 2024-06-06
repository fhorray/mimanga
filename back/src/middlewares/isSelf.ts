import type { CustomRequestData } from 'types/types';

import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const isSelf = async (
  req: CustomRequestData,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.isAuthenticated()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'UNAUTHORIZED' });
    }

    // Search  logged in user's ID
    const userId = req.session.passport?.user;
    if (!userId) return false;

    // Get the params ID
    const { id } = req.params;
    if (!id) return false;

    if (userId !== id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'UNAUTHORIZED 1' });
    }

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' });
  }
};
