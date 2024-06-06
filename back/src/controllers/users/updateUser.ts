import { db } from '@/db/config';
import { users, users as usersTable } from '@/db/schemas';

import { eq } from 'drizzle-orm';
import type { Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from '@/types/types';

// UPDATE USER BY ID
export const updateUser = async (req: CustomRequestData, res: Response) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedUser = await db
      .update(usersTable)
      .set(newData)
      .where(eq(usersTable.id, id))
      .returning({
        id: users.id,
        name: users.name,
        username: users.username,
        email: users.email,
        role: users.role,
      });

    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'BAD REQUEST' });
  }
};
