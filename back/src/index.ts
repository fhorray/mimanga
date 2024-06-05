import express, { type Request, type Response } from 'express';
import { mangasRouter } from '@/routes/Mangas';
import 'dotenv/config';

import session from 'express-session';
import pgSession from 'connect-pg-simple';

import { authRouter } from './routes/Auth';
import passport from 'passport';
import './auth';

const app = express();
app.use(express.json());

// Middlewares Global
// app.use(globalMiddleware);

const pgStore = pgSession(session);

app.use(
  session({
    store: new pgStore({
      conString: process.env.DATABASE_URL,
      tableName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7, // 1 week
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/mangas', mangasRouter);
app.use('/api/v1/auth', authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
