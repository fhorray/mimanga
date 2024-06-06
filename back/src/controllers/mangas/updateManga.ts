import { db } from '@/db/config';
import { mangas, publishers } from '@/db/schemas';
import { eq } from 'drizzle-orm';

import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';

// UPDATE A MANGA BY ID
export const updateManga = async (req: Request, res: Response) => {
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
