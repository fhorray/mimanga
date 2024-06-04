import express from 'express';
import morgan from 'morgan';
import { mangasRouter } from '@/routes/Mangas';
import 'dotenv/config';
import { globalMiddleware } from './middlewares/global';

const app = express();
morgan('short');

// Middlewares Global
app.use(globalMiddleware);

app.use(express.json());
app.use(mangasRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
