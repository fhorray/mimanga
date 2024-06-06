import { db } from '@/db/config';
import { users, users as usersTable } from '@/db/schemas';
import { password } from 'bun';

import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import type { CustomRequestData } from 'types/types';

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // TODO: Improve this query trying to remove WITH and use only COLUMNS!
    const users = await db.query.users.findMany({
      columns: {
        password: false,
      },
      with: {
        favoriteMangas: {
          columns: {
            mangaId: false,
            userId: false,
          },
          with: {
            manga: {
              columns: {
                publisherId: false,
                originalRunId: false,
              },
              with: {
                originalRun: true,
                publishers: true,
              },
            },
          },
        },
      },
    });

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'BAD REQUEST' });
  }
};

// GET USER BY ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
    where: (users, { eq }) => eq(users.id, id),
  });

  res.status(StatusCodes.OK).json(user);
};

// UPDATE USER BY ID
export const updateUserById = async (req: CustomRequestData, res: Response) => {
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

export const deleteUserById = async (req: CustomRequestData, res: Response) => {
  try {
    const { id } = req.params;

    req.logout(async (err) => {
      await db.delete(users).where(eq(users.id, id));

      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
      } else {
        res.status(StatusCodes.OK).send('Logged out');
      }
    });

    return res.status(StatusCodes.OK).send({ message: 'deletado' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'BAD REQUEST' });
  }
};
