import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Mangas } from '@/../types/mangas';

const mangas: Mangas = await Bun.file('./src/db/static.json').json();

// GET ALL MANGAS
export const getAllMangas = (req: Request, res: Response) => {
  res.json(mangas);
};

// GET A MANGA BY ID
export const getManga = (req: Request, res: Response) => {
  const id = req.params.id;
  const manga = mangas.data.find((manga: any) => manga.id === id);

  // if manga doesn exist
  if (!manga) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Manga not found' });
  }

  res.json(manga || { error: 'Manga not found' });
};
