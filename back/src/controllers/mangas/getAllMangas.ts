import { mangas as mangasTable } from '@/db/schemas';
import { mangaServices } from '@/services/mangaServices';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// GET ALL MANGAS
export const getAllMangas = async (req: Request, res: Response) => {
  try {
    const mangas = await mangaServices.getAllMangas(mangasTable);

    res.status(StatusCodes.OK).json(mangas);
  } catch (error) {
    console.error('Error fetching mangas: ', error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error fetching mangas' });
  }
};
