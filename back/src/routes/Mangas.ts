import express from 'express';
import {
  createManga,
  deleteMangaById,
  deleteSelectedMangas,
  getAllMangas,
  getMangaById,
  updateMangaById,
} from '../controllers/mangasControllers';

const mangasRouter = express.Router();

mangasRouter
  .route('/api/v1/mangas') //pretier-ignore
  .get(getAllMangas)
  .post(createManga)
  .delete(deleteSelectedMangas);

mangasRouter
  .route('/api/v1/mangas/:id')
  .get(getMangaById)
  .patch(updateMangaById)
  .delete(deleteMangaById);

export { mangasRouter };
