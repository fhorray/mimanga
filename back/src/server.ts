import express, { type Response } from 'express';
import 'dotenv/config';

import { mangasRouter } from '@/routes/Mangas';
import { authRouter } from './routes/Auth';
import { usersRouter } from './routes/Users';
import { sessionUse } from '@/session';

import cors from 'cors';

import passport from 'passport';
import '@/strategies/apitoken';
import '@/strategies/local';
import '@/strategies/bearer';
import '@/strategies/discord';
import type { CustomRequestData } from './types/types';
import { userServices } from './services/userServices';

// APP INIT
const app = express();
app.use(express.json());
app.use(cors());

// session
app.use(sessionUse);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/mangas', mangasRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

// DISCORD TESTS
app.get('/api/auth/discord', passport.authenticate('discord'));
app.get(
  '/api/auth/discord/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/api/auth/discord',
    successRedirect: '/profile',
  }),
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
