import express from 'express';

import { isAdmin } from '@/middlewares/isAdmin';
import { getAllMangas } from '@/controllers/mangas/getAllMangas';
import { createManga } from '@/controllers/mangas/createManga';
import { deleteMangas } from '@/controllers/mangas/deleteMangas';
import { getManga } from '@/controllers/mangas/getManga';
import { updateManga } from '@/controllers/mangas/updateManga';

const mangasRouter = express.Router();

mangasRouter
  .route('/')
  .get(getAllMangas)
  .post(isAdmin, createManga)
  .delete(isAdmin, deleteMangas);

mangasRouter
  .route('/:id')
  .get(getManga)
  .patch(isAdmin, updateManga)
  .delete(isAdmin, deleteMangas);

export { mangasRouter };
