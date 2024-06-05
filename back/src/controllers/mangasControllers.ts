import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { mangasTable, type InsertManga, type SelectManga } from "@/db/schemas";
import { db } from "@/db/config";
import { eq, inArray } from "drizzle-orm";

// TODO: separete in files

// GET ALL MANGAS
export const getAllMangas = async (req: Request, res: Response) => {
  try {
    const mangas = await db.select().from(mangasTable);

    res.status(StatusCodes.OK).json(mangas);
  } catch (error) {
    console.error("Error fetching mangas: ", error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Error fetching mangas" });
  }
};

// GET A MANGA BY ID
export const getMangaById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const mangas = await db.select().from(mangasTable);

    const manga = mangas.find((manga) => manga.id === id);

    if (!manga) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Manga not found" });
    }

    res.status(StatusCodes.OK).json({
      status: "success",
      manga,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Manga not found" });
  }
};

// UPDATE A MANGA BY ID
export const updateMangaById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const mangas = await db.select().from(mangasTable);

    const manga = mangas.find((manga) => manga.id === id);

    if (!manga) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Manga not found" });
    }

    // Update manga
    await db.update(mangasTable).set(newData).where(eq(mangasTable.id, id));

    res.status(StatusCodes.OK).json({
      status: "success",
      manga: newData,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Error updating manga" });
  }
};

// CREATE A MANGA
export const createManga = async (req: Request, res: Response) => {
  try {
    const data: InsertManga = req.body;

    if (!data.title) {
      console.log("SEM DATA");
      console.log(data);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please provide a manga data" });
    }

    await db.insert(mangasTable).values(data);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      manga: data,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Error trying to create a manga!!" });
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
        .json({ error: "Manga not found" });
    }

    await db.delete(mangasTable).where(eq(mangasTable.id, id)).returning();

    res.status(StatusCodes.OK).json({
      status: "success",
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
      return res.json({ error: "No mangas selected!" });
    }

    await db.delete(mangasTable).where(inArray(mangasTable.id, ids));

    res.status(StatusCodes.OK).json({
      status: "success",
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Error trying to delete mangas" });
  }
};
