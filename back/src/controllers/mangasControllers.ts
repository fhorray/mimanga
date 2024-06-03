import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { deleteManga, getMangas, insertManga } from '@/db/models/mangas';

// TODO: separete in files

// GET ALL MANGAS
export const getAllMangas = async (req: Request, res: Response) => {
  try {
    const mangas = await getMangas();
    res.status(StatusCodes.OK).json(mangas);
  } catch (error) {
    console.error('Error fetching mangas: ', error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error fetching mangas' });
  }
};

// GET A MANGA BY ID
export const getMangaById = async (req: Request, res: Response) => {
  const mangas = await getMangas();

  // Check if mangas list exists
  if (!mangas) {
    console.error('Error fetching manga');
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Manga not found' });
  }

  const id = req.params.id;
  console.log(typeof mangas[0].id);
  const manga = mangas.find((manga) => manga.id === parseInt(id));

  if (!manga) {
    console.error('Error fetching manga');
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Manga not found' });
  }

  res.status(StatusCodes.OK).json(manga);
};

// CREATE A MANGA
export const createManga = async (req: Request, res: Response) => {
  const { title, author } = req.body;

  // Check if title and author are provided
  if (!title || !author) {
    console.error('Error inserting manga!');
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'No data provided!' });
  }

  await insertManga(title, author);
  res.status(StatusCodes.CREATED).json('Successfully!');
};

// DELETE A MANGA
export const deleteMangaById = async (req: Request, res: Response) => {
  const mangas = await getMangas();

  // Check if mangas list exists
  if (!mangas) {
    console.error('Error fetching manga');
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Manga not found' });
  }

  const id = req.params.id;
  const manga = mangas.find((manga) => manga.id === parseInt(id));
  await deleteManga(id);
  res.status(StatusCodes.OK).send('Successfully!');
};
