import express from "express";
import {
  createManga,
  deleteMangaById,
  deleteSelectedMangas,
  getAllMangas,
  getMangaById,
  updateMangaById,
} from "../controllers/mangasControllers";

const mangasRouter = express.Router();

mangasRouter
  .route("/")
  .get(getAllMangas)
  .post(createManga)
  .delete(deleteSelectedMangas);

mangasRouter
  .route("/:id")
  .get(getMangaById)
  .patch(updateMangaById)
  .delete(deleteMangaById);

export { mangasRouter };
