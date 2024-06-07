import { db } from "@/db/config";
import {
  publishers,
  type InsertManga,
  type mangas as mangasTable,
} from "@/db/schemas";
import { eq } from "drizzle-orm";
import type { TableWithId } from "@/types/extended";

import type { PgTable } from "drizzle-orm/pg-core";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// TODO: study more about generics
// GET ALL MANGAS
const getAllMangas = async (table: typeof mangasTable) => {
  if (!table) {
    throw new Error("No table provided");
  }

  return await db.query.mangas.findMany({
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
};

// GET MANGA BY ID
const getManga = async (table: typeof mangasTable, id: string) => {
  if (!table) {
    throw new Error("No table provided");
  }

  return await db.query.mangas.findFirst({
    where: eq(table.id, id),
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
};

// CREATE MANGA
const createManga = async (table: typeof mangasTable, data: InsertManga) => {
  if (!table || !data) {
    throw new Error("No table provided");
  }

  return await db.insert(table).values(data);
};

// DELETE MANGA BY ID
const deleteManga = async (table: typeof mangasTable, id: string) => {
  if (!table || !id) {
    throw new Error("No table or id provided");
  }

  return await db.delete(table).where(eq(table.id, id));
};

// DELETE SELECTED MANGAS
const deleteMangas = async (table: typeof mangasTable, ids: string[]) => {};

const updateManga = async (
  table: typeof mangasTable,
  id: string,
  req: Request,
  res: Response
) => {
  if (!table || !id) {
    throw new Error("No table or id provided");
  }

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
      .json({ error: "Manga not found" });
  }

  const mangaData = req.body;
  const publishersData = mangaData.publishers;
  const publisherId = manga.publisherId;

  // Remover dados aninhados de publishers do objeto mangaData
  delete mangaData.publishers;

  // Atualizar tabela de mangas
  await db.update(table).set(mangaData).where(eq(table.id, id));

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
};

export const mangaServices = {
  getAllMangas,
  getManga,
  deleteManga,
  deleteMangas,
  createManga,
  updateManga,
};
