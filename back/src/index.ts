import express from 'express';
import morgan from 'morgan';
import { mangasRouter } from '@/routes/Mangas';
import 'dotenv/config';

morgan('dev');

const app = express();
app.use(express.json());
app.use(mangasRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
