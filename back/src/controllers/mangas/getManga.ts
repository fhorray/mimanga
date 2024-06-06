import { db } from '@/db/config';
import { mangas as mangasTable } from '@/db/schemas';
import { eq } from 'drizzle-orm';

import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';

// GET A MANGA BY ID
export const getManga = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const mangas = await db.query.mangas.findFirst({
      where: eq(mangasTable.id, id),
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

    if (!mangas) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'Manga not found' });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      mangas,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Manga not found' });
  }
};
