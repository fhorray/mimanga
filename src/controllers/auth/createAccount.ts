import { StatusCodes } from 'http-status-codes';

import type { Response } from 'express';
import type { CustomRequestData } from '@/types/types';

import { authServices } from '@/services/authServices';

// CREATE ACCOUNT
export const createAccount = async (req: CustomRequestData, res: Response) => {
  try {
    // create user inside db
    const createdUser = await authServices.createUser(req, res);

    res.status(StatusCodes.OK).json({ status: 'ok', user: createdUser });
  } catch (error) {
    const typedError = error as Error;

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: typedError.message });
  }
};
