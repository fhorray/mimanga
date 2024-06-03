import express from 'express';
import { getAllMangas, getManga } from '../controllers/mangasControllers';

export const router = express.Router();

router.get('/api/v1/mangas', getAllMangas);
router.get('/api/v1/mangas/:id', getManga);
