import { db } from '@/db/config';
import { mangas as mangasTable } from '@/db/schemas';
import { inArray } from 'drizzle-orm';

import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';

// DELETE SELECTED MANGAS
export const deleteMangas = async (req: Request, res: Response) => {
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
