import { db } from '@/db/config';
import { mangas as mangasTable } from '@/db/schemas';
import { eq } from 'drizzle-orm';

import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';

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
