import { db } from '@/db/config';
import { mangas as mangasTable } from '@/db/schemas';
import type { InsertManga } from '@/db/schemas';

import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';
import { mangaServices } from '@/services/mangaServices';

// CREATE A MANGA
export const createManga = async (req: Request, res: Response) => {
  try {
    const data: InsertManga = req.body;

    if (!data.title) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Please provide a manga data' });
    }

    await mangaServices.createManga(mangasTable, data);

    res.status(StatusCodes.CREATED).json({
      status: 'MANGA CREATED',
      manga: data,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error trying to create a manga!!' });
  }
};
