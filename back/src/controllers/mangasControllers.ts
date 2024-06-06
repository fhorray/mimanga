import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  mangas,
  mangas as mangasTable,
  publishers,
  type InsertManga,
  type SelectManga,
  type SelectPublisher,
} from '@/db/schemas';
import { db } from '@/db/config';
import { eq, inArray } from 'drizzle-orm';

// TODO: separete in files

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

// GET A MANGA BY ID
export const getMangaById = async (req: Request, res: Response) => {
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

// UPDATE A MANGA BY ID
export const updateMangaById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Buscar o manga pelo ID
    const manga = await db.query.mangas.findFirst({
      where: (mangas, { eq }) => eq(mangas.id, id),
      with: {
        originalRun: true,
        publishers: true,
      },
    });

    if (!manga) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Manga not found' });
    }

    const mangaData = req.body;
    const publishersData = mangaData.publishers;
    const publisherId = manga.publisherId;

    // Remover dados aninhados de publishers do objeto mangaData
    delete mangaData.publishers;

    // Atualizar tabela de mangas
    await db.update(mangas).set(mangaData).where(eq(mangas.id, id));

    // Atualizar tabela de publishers, caso exista publishersData e publisherId
    if (publishersData && publisherId) {
      await db
        .update(publishers)
        .set(publishersData)
        .where(eq(publishers.id, publisherId));
    }

    // Buscar novamente o manga atualizado com suas relações
    const updatedManga = await db.query.mangas.findFirst({
      where: (mangas, { eq }) => eq(mangas.id, id),
      with: {
        originalRun: true,
        publishers: true,
      },
    });

    res.status(StatusCodes.OK).json({
      manga: updatedManga,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error updating manga' });
  }
};

// CREATE A MANGA
export const createManga = async (req: Request, res: Response) => {
  try {
    const data: InsertManga = req.body;

    if (!data.title) {
      console.log('SEM DATA');
      console.log(data);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Please provide a manga data' });
    }

    await db.insert(mangasTable).values(data);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      manga: data,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error trying to create a manga!!' });
  }
};

// DELETE A MANGA
export const deleteMangaById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const mangas = await db.select().from(mangasTable);
    const manga = mangas.find((manga) => manga.id === id);

    if (!manga) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Manga not found' });
    }

    await db.delete(mangasTable).where(eq(mangasTable.id, id)).returning();

    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (error) {}
};

// DELETE SELECTED MANGAS
export const deleteSelectedMangas = async (req: Request, res: Response) => {
  try {
    const ids = req.body.ids;
    const mangas = await db.select().from(mangasTable);

    const mangasToDelete = mangas.filter((manga) => ids.includes(manga.id));

    if (!mangasToDelete.length) {
      return res.json({ error: 'No mangas selected!' });
    }

    await db.delete(mangasTable).where(inArray(mangasTable.id, ids));

    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Error trying to delete mangas' });
  }
};
