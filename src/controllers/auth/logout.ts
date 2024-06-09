import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    } else {
      res.status(StatusCodes.OK).send('Logged out');
    }
  });

  res.send('Logged out');
};
