import { db } from '@/db/config';
import { users, users as usersTable } from '@/db/schemas';

import { eq } from 'drizzle-orm';
import type { Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from '@/types/types';
import { userServices } from '@/services/userServices';

// UPDATE USER BY ID
export const updateUser = async (req: CustomRequestData, res: Response) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    //create a function to create a random username

    const updatedUser = await userServices.updateUser(newData, id);

    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'BAD REQUEST' });
  }
};
