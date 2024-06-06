import express from 'express';

import passport from 'passport';
import pgSession from 'connect-pg-simple';

const app = express();

import session from 'express-session';

const pgStore = pgSession(session);

export const sessionUse = app.use(
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
