import express from 'express';
import {
  createManga,
  deleteMangaById,
  getAllMangas,
  getMangaById,
  updateMangaById,
} from '../controllers/mangasControllers';

const mangasRouter = express.Router();

mangasRouter.route('/api/v1/mangas').get(getAllMangas).post(createManga);

mangasRouter
  .route('/api/v1/mangas/:id')
  .get(getMangaById)
  .patch(updateMangaById)
  .delete(deleteMangaById);

export { mangasRouter };
