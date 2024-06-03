import express from 'express';
import {
  createManga,
  deleteMangaById,
  getAllMangas,
  getMangaById,
} from '../controllers/mangasControllers';

const router = express.Router();

router.get('/api/v1/mangas', getAllMangas);
router.post('/api/v1/mangas', createManga);

router.get('/api/v1/mangas/:id', getMangaById);
router.delete('/api/v1/mangas/:id', deleteMangaById);

export { router };
