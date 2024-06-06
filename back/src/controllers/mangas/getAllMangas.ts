import { db } from '@/db/config';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// GET ALL MANGAS
export const getAllMangas = async (req: Request, res: Response) => {
  try {
    const mangas = await db.query.mangas.findMany({
      with: {
        originalRun: {
          columns: {
            id: false,
          },
        },
        publishers: {
          columns: {
            id: false,
          },
        },
      },
    });

    res.status(StatusCodes.OK).json(mangas);
  } catch (error) {
    console.error('Error fetching mangas: ', error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error fetching mangas' });
  }
};
