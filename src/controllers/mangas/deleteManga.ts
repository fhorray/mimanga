import { db } from "@/db/config";
import { mangas as mangasTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

import { StatusCodes } from "http-status-codes";

import type { Request, Response } from "express";
import { mangaServices } from "@/services/mangaServices";

// DELETE A MANGA
export const deleteMangaById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const mangas = await mangaServices.getAllMangas(mangasTable);

    // TODO: decide if this will be a util or create another service fort this function.
    const manga = mangas.find((manga) => manga.id === id);

    if (!manga) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Manga not found" });
    }

    // delete manga
    await mangaServices.deleteManga(mangasTable, id);

    res.status(StatusCodes.OK).json({
      status: "success",
    });
  } catch (error) {}
};
