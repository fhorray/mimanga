import { db } from '@/db/config';

import type { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

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
