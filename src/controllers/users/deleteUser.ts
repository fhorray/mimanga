import { db } from '@/db/config';
import { users } from '@/db/schemas';

import { eq } from 'drizzle-orm';
import type { Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from '@/types/types';

// DELETE USER BY ID
export const deleteUser = async (req: CustomRequestData, res: Response) => {
  try {
    const { id } = req.params;
    const loggedUserId = req.session.passport?.user;

    if (id === loggedUserId) {
      req.logout(async (err) => {
        await db.delete(users).where(eq(users.id, id));

        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
        } else {
          res.status(StatusCodes.OK).send('Logged out');
        }
      });
    }

    await db.delete(users).where(eq(users.id, id));

    return res.status(StatusCodes.OK).send({ message: 'deletado' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'BAD REQUEST' });
  }
};
