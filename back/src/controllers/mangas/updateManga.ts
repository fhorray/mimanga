import { mangas, publishers } from '@/db/schemas';

import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';
import { mangaServices } from '@/services/mangaServices';

// UPDATE A MANGA BY ID
export const updateManga = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedManga = await mangaServices.updateManga(mangas, id, req, res);

    res.status(StatusCodes.OK).json({
      manga: updatedManga,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error updating manga' });
  }
};
