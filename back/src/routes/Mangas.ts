import express from 'express';
import {
  createManga,
  deleteMangaById,
  deleteSelectedMangas,
  getAllMangas,
  getMangaById,
  updateMangaById,
} from '../controllers/mangasControllers';
import { isAdmin } from '@/middlewares/isAdmin';

const mangasRouter = express.Router();

mangasRouter
  .route('/')
  .get(getAllMangas)
  .post(isAdmin, createManga)
  .delete(isAdmin, deleteSelectedMangas);

mangasRouter
  .route('/:id')
  .get(getMangaById)
  .patch(isAdmin, updateMangaById)
  .delete(isAdmin, deleteMangaById);

export { mangasRouter };
