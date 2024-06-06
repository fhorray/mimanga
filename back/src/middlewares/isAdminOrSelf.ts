import type { CustomRequestData } from 'types/types';

import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isAdmin } from './isAdmin';
import { findUserById } from '@/utils/users';

export const isAdminOrSelf = async (
  req: CustomRequestData,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get the id comming from /:id & find the user.
    const { id } = req.params;
    const user = await findUserById(id);

    // get the id from loged user & find the user.
    const loggedUserId = req.session.passport?.user;
    const loggedUser = await findUserById(loggedUserId);

    // verify if the user param ID is equal to the logged user ID
    if (!user || !loggedUser)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'UNAUTHORIZED: PLEASE LOGIN FIRST' });

    // verify if the user is admin or self, if one of this conditions is TRUE
    const isSelf = user.id !== loggedUser.id;
    const isAdmin = loggedUser.role !== 'admin';

    if (isAdmin && isSelf) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'FORBIDDEN: You are not authorized to access this resource',
      });
    }

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' });
  }
};
