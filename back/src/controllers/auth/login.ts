import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    res.status(StatusCodes.OK).send('Successfully logged in!');
  } catch (error) {
    console.error('Error logging in: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error logging in' });
  }
};
